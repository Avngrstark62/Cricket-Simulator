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

function pickRandom(map) {
    const entries = Object.entries(map);
    let sum = 0;
    const cumulativeProbabilities = entries.map(([value, prob]) => [value, sum += prob]);
    const randomValue = Math.random();

    for (const [value, cumulative] of cumulativeProbabilities) {
        if (randomValue < cumulative) {
            return value;
        }
    }

    console.warn("pickRandom reached fallback case. Check probabilities.");
    return entries[entries.length - 1][0];
}


const wideMap={
    10:{
        "y": 0.08,
        "n": 0.92
    },

    20:{
        "y": 0.08,
        "n": 0.92
    },

    50:{
        "y": 0.08,
        "n": 0.92
    }
};

const noballMap={
    10:{
        "y": 0.01,
        "n": 0.99
    },

    20:{
        "y": 0.01,
        "n": 0.99
    },
    
    50:{
        "y": 0.01,
        "n": 0.99
    }
};

const wicketTypeMap={
    10:{
        "none": 0.9,
        "bowled": 0.02,
        "caught": 0.02,
        "lbw": 0.02,
        "stumped": 0.02,
        "striker-runnout": 0.01,
        "nonstriker-runnout": 0.01
    },

    20:{
        "none": 0.95,
        "bowled": 0.01,
        "caught": 0.01,
        "lbw": 0.01,
        "stumped": 0.01,
        "striker-runnout": 0.005,
        "nonstriker-runnout": 0.005
    },
    
    50:{
        "none": 0.975,
        "bowled": 0.005,
        "caught": 0.005,
        "lbw": 0.005,
        "stumped": 0.005,
        "striker-runnout": 0.0025,
        "nonstriker-runnout": 0.0025
    }
};

const runsFromBatMap={
    10:{
        0: 0.2,
        1: 0.4,
        2: 0.1,
        3: 0.0,
        4: 0.2,
        6: 0.1
    },

    20:{
        0: 0.295,
        1: 0.30,
        2: 0.18,
        3: 0.005,
        4: 0.15,
        6: 0.07
    },
    
    50:{
        0: 0.356,
        1: 0.40,
        2: 0.15,
        3: 0.004,
        4: 0.06,
        6: 0.03
    }
};


export class Delivery {
    constructor(overs, isFreeHit){
        if (isFreeHit){
            this.freehit="y"
        }
        else{
            this.freehit="n"
        }

        this.wideMap=wideMap[overs]
        this.noballMap=noballMap[overs]
        this.wicketTypeMap=wicketTypeMap[overs]
        this.runsFromBatMap=runsFromBatMap[overs]

    }

    throw(){
        this.wide=pickRandom(this.wideMap)
        this.noball=pickRandom(this.noballMap)

        if (this.wide=="y"){
            this.runsFromBat=0
            if (this.noball=="y" || this.freehit=="y"){
                this.wicketType="none"
            }
            else{
                this.wicketTypeMap={
                    "none": 0.99999,
                    "stumped": 0.00001
                }
                this.wicketType=pickRandom(this.wicketTypeMap)
            }
        }
        else{
            if (this.noball=="y" || this.freehit=="y"){
                this.wicketTypeMap={
                    "none": 0.99998,
                    "striker-runnout": 0.00001,
                    "nonstriker-runnout": 0.00001
                }
            }
            this.wicketType=pickRandom(this.wicketTypeMap);
            if (this.wicketType=="striker-runnout" || this.wicketType=="nonstriker-runnout"){
                this.runsFromBatMap={
                    0: 0.5,
                    1: 0.4,
                    2: 0.1,
                }
            }
            else if(["bowled", "caught", "lbw", "stumped"].includes(this.wicketType)){
                this.runsFromBatMap={
                    0:1
                }
            }
            this.runsFromBat=pickRandom(this.runsFromBatMap);
        }

        this.runsFromBat = parseInt(this.runsFromBat)
    }

    toJSON(){
        return {
            wide: this.wide,
            noball: this.noball,
            freehit: this.freehit,
            wicketType: this.wicketType,
            runsFromBat: this.runsFromBat
        }
    }
}

export const updateBattingScorecard = async (match, delivery) => {
    const battingTeamLabel = getBattingTeamLabel(match);
    const striker = match.striker;
    const bowler = match.bowler
    let battingScorecard=null;
    if (battingTeamLabel=="teamA"){
        battingScorecard = match.battingScorecard.teamA
    }
    else if (battingTeamLabel=="teamB"){
        battingScorecard = match.battingScorecard.teamB
    }
    else{
        return res.status(400).json({ success: false, message: "Invalid Batting Team Label" });
    }

    for(let i=0;i<battingScorecard.length;i++){
        if (battingScorecard[i].name==striker){
            battingScorecard[i].runs+=delivery.runsFromBat;
            if(delivery.wide=="n"){
                battingScorecard[i].balls+=1
            }
            if(delivery.runsFromBat==4){
                battingScorecard[i].fours+=1
            }
            if(delivery.runsFromBat==6){
                battingScorecard[i].sixes+=1
            }
            battingScorecard[i].strikeRate=((battingScorecard[i].runs)/(battingScorecard[i].balls)*100).toFixed(2)
            if(delivery.wicketType!="none" && delivery.wicketType!="nonstriker-runnout"){
                battingScorecard[i].howOut=delivery.wicketType
                if(delivery.wicketType!="striker-runnout"){
                    battingScorecard[i].bowler=bowler
                }
            }
        }
    }

    if (battingTeamLabel=="teamA"){
        match.battingScorecard.teamA = battingScorecard
    }
    else if (battingTeamLabel=="teamB"){
        match.battingScorecard.teamB = battingScorecard
    }
    else{
        return res.status(400).json({ success: false, message: "Invalid Batting Team Label" });
    }

    await match.save();


}

export const updateBowlingScorecard = async (match, delivery) => {
    const battingTeamLabel = getBattingTeamLabel(match);
    const bowler = match.bowler
    let bowlingScorecard=null;
    if (battingTeamLabel=="teamA"){
        bowlingScorecard = match.bowlingScorecard.teamB
    }
    else if (battingTeamLabel=="teamB"){
        bowlingScorecard = match.bowlingScorecard.teamA
    }
    else{
        return res.status(400).json({ success: false, message: "Invalid Batting Team Label" });
    }

    for(let i=0;i<bowlingScorecard.length;i++){
        if (bowlingScorecard[i].name==bowler){
            if(delivery.wide=="n" && delivery.noball=="n"){
                bowlingScorecard[i].balls+=1
            }
            bowlingScorecard[i].maidens+=0
            bowlingScorecard[i].runsConceded+=delivery.runsFromBat
            if(delivery.wide=="y"){
                bowlingScorecard[i].runsConceded+=1
            }
            if(delivery.noball=="y"){
                bowlingScorecard[i].runsConceded+=1
            }
            if(delivery.wicketType!="none" && delivery.wicketType!="nonstriker-runnout" && delivery.wicketType!="striker-runnout"){
                bowlingScorecard[i].wickets+=1
            }
            bowlingScorecard[i].economy=((bowlingScorecard[i].runsConceded)/(bowlingScorecard[i].balls)*6).toFixed(2)
        }
    }

    if (battingTeamLabel=="teamA"){
        match.bowlingScorecard.teamB = bowlingScorecard
    }
    else if (battingTeamLabel=="teamB"){
        match.bowlingScorecard.teamA = bowlingScorecard
    }
    else{
        return res.status(400).json({ success: false, message: "Invalid Batting Team Label" });
    }

    await match.save();
}

export const updateStrikeAndBowler = async (match, delivery) => {
    const battingTeamLabel = getBattingTeamLabel(match);
    let bowler = match.bowler
    let striker = match.striker
    let nonStriker = match.nonStriker

    let bowlingScorecard=null;
    if (battingTeamLabel=="teamA"){
        bowlingScorecard = match.bowlingScorecard.teamB
    }
    else if (battingTeamLabel=="teamB"){
        bowlingScorecard = match.bowlingScorecard.teamA
    }
    else{
        return res.status(400).json({ success: false, message: "Invalid Batting Team Label" });
    }

    let thisOverBalls=match.thisOverBalls;

    if(delivery.wide=="n" && delivery.noball=="n"){
        thisOverBalls+=1
    }
    let overEnded = false;
    if (thisOverBalls==6){
        overEnded=true
        match.thisOverBalls=0
    }
    else{
        match.thisOverBalls=thisOverBalls
    }

    if (delivery.wicketType!="none" && delivery.wicketType!="nonstriker-runnout"){
        striker=null
    }
    else if(delivery.wicketType=="nonstriker-runnout"){
        nonStriker=null;
    }

    let temp = null;
    if ((delivery.runsFromBat)%2!=0){
        temp = striker
        striker = nonStriker
        nonStriker = temp
    }

    if (overEnded){
        temp = striker
        striker = nonStriker
        nonStriker = temp
        bowler=null;
    }

    match.striker = striker
    match.nonStriker = nonStriker
    match.bowler = bowler

    await match.save();
}

export const updateScore = async (match, delivery) => {
    const battingTeamLabel = getBattingTeamLabel(match);

    let score=null;
    if (battingTeamLabel=="teamA"){
        score = match.score.teamA
    }
    else if (battingTeamLabel=="teamB"){
        score = match.score.teamB
    }
    else{
        return res.status(400).json({ success: false, message: "Invalid Batting Team Label" });
    }

    score.runs+=delivery.runsFromBat
    if (delivery.wide=="y"){
        score.runs+=1
    }
    if (delivery.noball=="y"){
        score.runs+=1
    }
    if (delivery.wicketType!="none"){
        score.wickets+=1
    }
    if (delivery.wide=="n" && delivery.noball=="n"){
        score.balls+=1
    }


    if (battingTeamLabel=="teamA"){
        
    }
    else if (battingTeamLabel=="teamB"){
        
    }
    else{
        return res.status(400).json({ success: false, message: "Invalid Batting Team Label" });
    }

    await match.save();
}

export const updateCurrentInning = async (match) => {

    const battingTeamLabel = getBattingTeamLabel(match);
    let score=null;
    if (battingTeamLabel=="teamA"){
        score = match.score.teamA
    }
    else if (battingTeamLabel=="teamB"){
        score = match.score.teamB
    }
    else{
        return res.status(400).json({ success: false, message: "Invalid Batting Team Label" });
    }

    let oversCompleted=false
    if (score.balls==match.overs*6){
        oversCompleted=true
    }
    // console.log(score.balls)
    // console.log(match.overs*6)
    let allout = false
    if (score.wickets==10){
        allout=true
    }
    if (oversCompleted || allout){
        match.currentInning=2
        match.striker=null
        match.nonStriker=null
        match.bowler=null
        match.thisOverBalls=0
    }
    await match.save();
}