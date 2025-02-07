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
            currentInning: 1,
            score: {
                teamA: { runs: 0, wickets: 0, balls: 0 },
                teamB: { runs: 0, wickets: 0, balls: 0 },
            },
            striker: null,
            nonStriker: null,
            bowler: null,
            thisOver: [],
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