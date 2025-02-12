import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    teams: {
      teamA: { type: String, required: true },
      teamB: { type: String, required: true },
    },

    overs: { type: Number, required: true },
    venue: { type: String, required: true },

    playing_XI: {
      teamA: [{ name: String, isCaptain: Boolean, isWicketKeeper: Boolean }],
      teamB: [{ name: String, isCaptain: Boolean, isWicketKeeper: Boolean }],
    },

    toss: {
      winner: { type: String, default: null }, // enum: ["teamA", "teamB"]
      electedTo: { type: String, default: null }, //enum: ["bat", "field"]
    },

    // State

    currentInning: { type: Number, default: 1 },

    score: {
      teamA: { runs: { type: Number, default: 0 }, wickets: { type: Number, default: 0 }, balls: { type: Number, default: 0 } },
      teamB: { runs: { type: Number, default: 0 }, wickets: { type: Number, default: 0 }, balls: { type: Number, default: 0 } },
    },

    striker: { type: String, default: null },
    nonStriker: { type: String, default: null },
    bowler: { type: String, default: null },

    thisOver: [
      {
        event: { type: String, enum: ["run", "wicket", "wide", "no-ball", "bye", "leg-bye"] },
        runs: { type: Number, default: 0 },
        extraType: { type: String, enum: ["wide", "no-ball", "bye", "leg-bye"], required: false },
        isWicket: { type: Boolean, default: false },
        wicketType: { type: String, required: false }, // "bowled", "caught", etc.
        fielder: { type: String, required: false }, // Who took the catch / ran out the batsman
      }
    ],
    
    thisOverBalls: {type: Number, default: 0},

    battingScorecard: {
      teamA: [
        {
          name: String,
          runs: Number,
          balls: Number,
          fours: Number,
          sixes: Number,
          strikeRate: Number,
          howOut: String,
          bowler: String,
        },
      ],
      teamB: [
        {
          name: String,
          runs: Number,
          balls: Number,
          fours: Number,
          sixes: Number,
          strikeRate: Number,
          howOut: String,
          bowler: String,
        },
      ],
    },

    bowlingScorecard: {
      teamA: [
        {
          name: String,
          balls: Number,
          maidens: Number,
          runsConceded: Number,
          wickets: Number,
          economy: Number,
        },
      ],
      teamB: [
        {
          name: String,
          balls: Number,
          maidens: Number,
          runsConceded: Number,
          wickets: Number,
          economy: Number,
        },
      ],
    },

    status: { type: String, enum: ["unfinished", "inProgress", "finished", "abandoned", "noResult"], default: "unfinished" },
    winner: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);