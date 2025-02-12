import express from 'express';
import { authMiddleware } from "../middleware/auth.middleware.js"
import { addNewBatsman, changeBowler, fetchAvailableBatsmen, fetchAvailableBowlers, fetchBattingScorecard, fetchBattingTeam, fetchBowler, fetchBowlerStats, fetchBowlingScorecard, fetchBowlingTeam, fetchNonStriker, fetchNonStrikerStats, fetchScoreboard, fetchScorecard, fetchStriker, fetchStrikerStats, throwDelivery } from '../controllers/inning.controller.js';

const router = express.Router();

router.get('/batting_team/:id', authMiddleware, fetchBattingTeam);
router.get('/bowling_team/:id', authMiddleware, fetchBowlingTeam);
router.get('/fetch_scoreboard/:id', authMiddleware, fetchScoreboard);
router.post('/fetch_scorecard/:id', authMiddleware, fetchScorecard);
router.get('/batting_scorecard/:id', authMiddleware, fetchBattingScorecard);
router.get('/bowling_scorecard/:id', authMiddleware, fetchBowlingScorecard);
router.get('/striker/:id', authMiddleware, fetchStriker);
router.get('/non_striker/:id', authMiddleware, fetchNonStriker);
router.get('/bowler/:id', authMiddleware, fetchBowler);
router.get('/available_batsmen/:id', authMiddleware, fetchAvailableBatsmen);
router.post('/add_new_batsman/:id', authMiddleware, addNewBatsman);
router.get('/available_bowlers/:id', authMiddleware, fetchAvailableBowlers);
router.post('/update_bowler/:id', authMiddleware, changeBowler);
router.get('/striker_stats/:id', authMiddleware, fetchStrikerStats);
router.get('/nonstriker_stats/:id', authMiddleware, fetchNonStrikerStats);
router.get('/bowler_stats/:id', authMiddleware, fetchBowlerStats);

router.get('/throw_delivery/:id', authMiddleware, throwDelivery);
export default router;