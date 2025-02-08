import express from 'express';
import { createMatch, fetchDefaultPlayingXI, fetchInningNumber, fetchIsTossDone, fetchTeams, fetchTossDetails, updateTossDetails } from '../controllers/match.controller.js';
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router();

router.post('/create', authMiddleware, createMatch);
router.post('/default_xi', authMiddleware, fetchDefaultPlayingXI);

router.get('/toss_details/:id', authMiddleware, fetchTossDetails);
router.post('/toss_details/:id', authMiddleware, updateTossDetails);
router.get('/is_toss_done/:id', authMiddleware, fetchIsTossDone);

router.get('/team_names/:id', authMiddleware, fetchTeams);

router.get('/inning_number/:id', authMiddleware, fetchInningNumber);

export default router;