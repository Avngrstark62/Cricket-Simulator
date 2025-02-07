import express from 'express';
import { createMatch, fetchDefaultPlayingXI } from '../controllers/match.controller.js';
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router();

router.post('/create', authMiddleware, createMatch);
router.post('/default_xi', authMiddleware, fetchDefaultPlayingXI);

export default router;