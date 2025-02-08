import Match from "../models/match.model.js";

const calculateBattingTeam = (match) => {
    const inningNumber = match.currentInning;
    const tossWinner = match.toss.winner;
    const electedTo = match.toss.electedTo;
    if (inningNumber==1){
        if((tossWinner=="teamA" && electedTo=="bat") || (tossWinner=="teamB" && electedTo=="field")){
            return match.teams.teamA
        }
        else{
            return match.teams.teamB
        }
    }
    else if(inningNumber==2){
        if((tossWinner=="teamA" && electedTo=="bat") || (tossWinner=="teamB" && electedTo=="field")){
            return match.teams.teamB
        }
        else{
            return match.teams.teamA
        }
    }
    else{
        return "Invalid Inning number";
    }
};

const calculateBowlingTeam = (match) => {
    const inningNumber = match.currentInning;
    const tossWinner = match.toss.winner;
    const electedTo = match.toss.electedTo;
    if (inningNumber==1){
        if((tossWinner=="teamA" && electedTo=="bat") || (tossWinner=="teamB" && electedTo=="field")){
            return match.teams.teamB
        }
        else{
            return match.teams.teamA
        }
    }
    else if(inningNumber==2){
        if((tossWinner=="teamA" && electedTo=="bat") || (tossWinner=="teamB" && electedTo=="field")){
            return match.teams.teamA
        }
        else{
            return match.teams.teamB
        }
    }
    else{
        return "Invalid Inning number";
    }
};

export const fetchBattingTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }

        const battingTeam = calculateBattingTeam(match);

        if (battingTeam=="Invalid Inning number"){
            return res.status(400).json({ success: false, message: "Invalid Inning number" });
        }
        
        return res.status(200).json({ success: true, battingTeam: battingTeam });
    } catch (error) {
        console.error("Error fetching batting team:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const fetchBowlingTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }

        const bowlingTeam = calculateBowlingTeam(match)

        if (bowlingTeam=="Invalid Inning number"){
            return res.status(400).json({ success: false, message: "Invalid Inning number" });
        }
        
        return res.status(200).json({ success: true, bowlingTeam: bowlingTeam });
    } catch (error) {
        console.error("Error fetching bowling team:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};