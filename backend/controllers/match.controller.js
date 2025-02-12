import Match from "../models/match.model.js";
import User from "../models/user.model.js";

export const createMatch = async (req, res) => {
    try {
        const { teamA, teamB, overs, venue, playingXI_A, playingXI_B } = req.body;
        
        const user = await User.findById(req.user.userId).select('-password');
        const userId = user._id;

        // Create new match object
        const newMatch = new Match({
            userId,
            teams: { teamA, teamB },
            overs,
            venue,
            playing_XI: {
                teamA: playingXI_A,
                teamB: playingXI_B,
            },
            // Initial state values
            toss: {
                winner: null,
                electedTo: null
            },
            currentInning: 1,
            score: {
                teamA: { runs: 0, wickets: 0, balls: 0 },
                teamB: { runs: 0, wickets: 0, balls: 0 },
            },
            striker: null,
            nonStriker: null,
            bowler: null,
            thisOver: [],
            thisOverBalls: 0,
            battingScorecard: { teamA: [], teamB: [] },
            bowlingScorecard: { teamA: [], teamB: [] },
            status: "unfinished",
            winner: null,
        });

        // Save match to database
        await newMatch.save();

        return res.status(201).json({ success: true, match: newMatch });
    } catch (error) {
        console.error("Error creating match:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const fetchDefaultPlayingXI = async (req, res) => {
    try {
        const { team } = req.body;

        const teams_default_xi = {
            "India": ["Rohit", "Dhawan", "Kohli", "Rahane", "Raina", "Dhoni", "Jadeja", "Ashwin", "Shami", "Umesh", "Mohit"],
            "Australia": ["Finch", "Warner", "Smith", "Clarke", "Watson", "Maxwell", "Haddin", "Faulkner", "Johnson", "Starc", "Hazlewood"],
            "New Zealand": ["McCullum", "Guptill", "Williamson", "Taylor", "Elliott", "Anderson", "Ronchi", "Vettori", "Southee", "Boult", "Henry"],
            "South Africa": ["Amla", "de Kock", "du Plessis", "AB de Villiers", "Miller", "Rossouw", "Duminy", "Steyn", "Philander", "Tahir", "Morkel"],
            "Pakistan": ["Shehzad", "Sarfaraz", "Haris Sohail", "Misbah", "Umar Akmal", "Afridi", "Sohaib Maqsood", "Wahab Riaz", "Rahat Ali", "Sohail Khan", "Irfan"],
            "Sri Lanka": ["Dilshan", "Thirimanne", "Sangakkara", "Jayawardene", "Mathews", "Chandimal", "Perera", "Kulasekara", "Malinga", "Lakmal", "Herath"],
            "England": ["Moeen Ali", "Bell", "Ballance", "Root", "Morgan", "Buttler", "Taylor", "Woakes", "Broad", "Finn", "Anderson"],
            "West Indies": ["Gayle", "Smith", "Samuels", "Darren Bravo", "Ramdin", "Russell", "Sammy", "Holder", "Taylor", "Roach", "Benn"],
            "Bangladesh": ["Tamim", "Sarkar", "Mahmudullah", "Shakib", "Mushfiqur", "Sabbir", "Nasir", "Mortaza", "Rubel", "Taskin", "Taijul"]
        };

        if (!team || !teams_default_xi[team]) {
            return res.status(400).json({ success: false, message: "Invalid or missing team name" });
        }

        const playing_xi = teams_default_xi[team];

        return res.status(200).json({ success: true, playing_xi });
    } catch (error) {
        console.error("Error fetching default playing XI:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const fetchTossDetails = async (req, res) => {
    try {
        const { id } = req.params
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }
        
        const tossDetails = {
            tossWinner: match.toss.winner,
            electedTo: match.toss.electedTo
        }

        return res.status(200).json({ success: true, tossDetails: tossDetails });
    } catch (error) {
        console.error("Error fetching toss details:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateTossDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }

        const { tossDetails } = req.body;

        match.toss.winner = tossDetails.tossWinner;
        match.toss.electedTo = tossDetails.electedTo;
        
        await match.save();


        return res.status(200).json({ success: true, tossDetails: tossDetails });
    } catch (error) {
        console.error("Error updating toss details:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const fetchTeams = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }

        // const teams = match.teams
        const teams = {
            teamA: match.teams.teamA,
            teamB: match.teams.teamB
        }


        return res.status(200).json({ success: true, teams: teams });
    } catch (error) {
        console.error("Error fetching teams:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const fetchIsTossDone = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }

        let isTossDone=false;
        if (match.toss.winner && match.toss.electedTo){
            isTossDone=true;
        }


        return res.status(200).json({ success: true, isTossDone: isTossDone });
    } catch (error) {
        console.error("Error fetching isTossDone:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const fetchInningNumber = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }

        const inningNumber = match.currentInning;
        
        return res.status(200).json({ success: true, inningNumber: inningNumber });
    } catch (error) {
        console.error("Error fetching inning number:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};