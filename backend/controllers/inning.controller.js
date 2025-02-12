import Match from "../models/match.model.js";
import { Delivery, updateBattingScorecard, updateBowlingScorecard, updateCurrentInning, updateScore, updateStrikeAndBowler } from "./delivery.controller.js";

const getBattingTeamLabel = (match) => {
    const inningNumber = match.currentInning;
    const tossWinner = match.toss.winner;
    const electedTo = match.toss.electedTo;

    if (inningNumber==1){
        if((tossWinner=="teamA" && electedTo=="bat") || (tossWinner=="teamB" && electedTo=="field")){
            return "teamA"
        }
        else{
            return "teamB"
        }
    }
    else if(inningNumber==2){
        if((tossWinner=="teamA" && electedTo=="bat") || (tossWinner=="teamB" && electedTo=="field")){
            return "teamB"
        }
        else{
            return "teamA"
        }
    }
    else{
        return null;
    }
}

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

export const fetchScoreboard = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }
        
        const battingTeamLabel = getBattingTeamLabel(match);
        
        let scoreboard = null;
        if (battingTeamLabel=="teamA"){
            scoreboard = match.score.teamA
        }
        else if (battingTeamLabel=="teamB"){
            scoreboard = match.score.teamB
        }
        else{
            return res.status(400).json({ success: false, message: "Invalid Batting Team Label" });
        }
        
        return res.status(200).json({ success: true, scoreboard: scoreboard });
    } catch (error) {
        console.error("Error fetching scoreboard:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const fetchBattingScorecard = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }
        
        const battingTeamLabel = getBattingTeamLabel(match);
        
        let battingScorecard = null;
        if (battingTeamLabel=="teamA"){
            battingScorecard = match.battingScorecard.teamA
        }
        else if (battingTeamLabel=="teamB"){
            battingScorecard = match.battingScorecard.teamB
        }
        else{
            return res.status(400).json({ success: false, message: "Invalid Batting Team Label" });
        }
        
        return res.status(200).json({ success: true, battingScorecard: battingScorecard });
    } catch (error) {
        console.error("Error fetching batting scorecard:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const fetchBowlingScorecard = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }

        const battingTeamLabel = getBattingTeamLabel(match);
        let bowlingScorecard = null;

        if (battingTeamLabel=="teamA"){
            bowlingScorecard = match.bowlingScorecard.teamB
        }
        else if (battingTeamLabel=="teamB"){
            bowlingScorecard = match.bowlingScorecard.teamA
        }
        else{
            return res.status(400).json({ success: false, message: "Invalid BattingTeamLabel" });
        }
        
        return res.status(200).json({ success: true, bowlingScorecard: bowlingScorecard });
    } catch (error) {
        console.error("Error fetching bowling scorecard:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const fetchStriker = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }

        const striker = match.striker;
        
        return res.status(200).json({ success: true, striker: striker });
    } catch (error) {
        console.error("Error fetching striker:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const fetchNonStriker = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }

        const nonStriker = match.nonStriker;
        
        return res.status(200).json({ success: true, nonStriker: nonStriker });
    } catch (error) {
        console.error("Error fetching nonStriker:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const fetchBowler = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }

        const bowler = match.bowler;
        
        return res.status(200).json({ success: true, bowler: bowler });
    } catch (error) {
        console.error("Error fetching bowler:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const fetchAvailableBatsmen = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }

        const battingTeamLabel = getBattingTeamLabel(match);
        let battingScorecard = null;
        let playingXI = null;
        if (battingTeamLabel=="teamA"){
            battingScorecard = match.battingScorecard.teamA
            playingXI = match.playing_XI.teamA
        }
        else if (battingTeamLabel=="teamB"){
            battingScorecard = match.battingScorecard.teamB
            playingXI = match.playing_XI.teamB
        }
        else{
            return res.status(400).json({ success: false, message: "Invalid BattingTeamLabel" });
        }

        playingXI = playingXI.map((player) => player.name);
        const ineligiblePlayers = battingScorecard.map((player) => player.name);

        const availableBatsmen = playingXI.filter(item => !ineligiblePlayers.includes(item));
        
        return res.status(200).json({ success: true, availableBatsmen: availableBatsmen });
    } catch (error) {
        console.error("Error fetching available batsmen:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const addNewBatsman = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        const { batsman, end } = req.body;
        const new_batsman = {
            name: batsman,
            runs: 0,
            balls: 0,
            fours: 0,
            sixes: 0,
            strikeRate: 0,
            howOut: null,
            bowler: null,
          }

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }

        const battingTeamLabel = getBattingTeamLabel(match);
        if (battingTeamLabel=="teamA"){
            match.battingScorecard.teamA.push(new_batsman);
        }
        else if (battingTeamLabel=="teamB"){
            match.battingScorecard.teamB.push(new_batsman);
        }
        else{
            return res.status(400).json({ success: false, message: "Invalid BattingTeamLabel" });
        }

        if(end=="striker"){
            match.striker = batsman;
        }
        else if(end=="nonStriker"){
            match.nonStriker = batsman;
        }else{
            return res.status(400).json({ success: false, message: "Invalid batting end" });
        }

        await match.save();
        
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error adding new batsman:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const fetchAvailableBowlers = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }

        const battingTeamLabel = getBattingTeamLabel(match);
        let playingXI = null;
        if (battingTeamLabel=="teamA"){
            playingXI = match.playing_XI.teamB
        }
        else if (battingTeamLabel=="teamB"){
            playingXI = match.playing_XI.teamA
        }
        else{
            return res.status(400).json({ success: false, message: "Invalid BattingTeamLabel" });
        }

        playingXI = playingXI.map((player) => player.name);

        const availableBowlers = playingXI
        
        return res.status(200).json({ success: true, availableBowlers: availableBowlers });
    } catch (error) {
        console.error("Error fetching available bowlers:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const changeBowler = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        
        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }

        const { bowler } = req.body;
        match.bowler = bowler;

        const battingTeamLabel = getBattingTeamLabel(match);
        const new_bowler = {
            name: bowler,
            balls: 0,
            maidens: 0,
            runsConceded: 0,
            wickets: 0,
            economy: 0,
          }
        let bowlingScorecard = null;
        if (battingTeamLabel=="teamA"){
            bowlingScorecard = match.bowlingScorecard.teamB
            const bowlers = bowlingScorecard.map((player) => player.name);

            if (!(bowlers.includes(bowler))){
                match.bowlingScorecard.teamB.push(new_bowler);
            }
        }
        else if (battingTeamLabel=="teamB"){
            bowlingScorecard = match.bowlingScorecard.teamA
            const bowlers = bowlingScorecard.map((player) => player.name);

            if (!(bowlers.includes(bowler))){
                match.bowlingScorecard.teamA.push(new_bowler);
            }
        }
        else{
            return res.status(400).json({ success: false, message: "Invalid BattingTeamLabel" });
        }

        await match.save();
        
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error updating bowler:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const throwDelivery = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);

        
        if (!match) {
            return res.status(400).json({ success: false, message: "Match not found" });
        }
        
        let delivery = new Delivery(10, false);
        delivery.throw()

        await updateBattingScorecard(match, delivery);
        await updateBowlingScorecard(match, delivery);
        await updateScore(match, delivery);
        await updateStrikeAndBowler(match, delivery);
        // updateThisOver(match, delivery);
        if (match.currentInning==1){
            updateCurrentInning(match)
        }
        else{
            // updateStatus(match, delivery);
            // updateWinner(match, delivery);
        }
        
        return res.status(200).json({ success: true, delivery: delivery.toJSON() });
    } catch (error) {
        console.error("Error throwing delivery:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};