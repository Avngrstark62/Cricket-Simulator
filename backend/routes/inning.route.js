import express from 'express';
import { authMiddleware } from "../middleware/auth.middleware.js"
import { fetchBattingTeam, fetchBowlingTeam } from '../controllers/inning.controller.js';

const router = express.Router();

router.get('/batting_team/:id', authMiddleware, fetchBattingTeam);
router.get('/bowling_team/:id', authMiddleware, fetchBowlingTeam);

export default router;