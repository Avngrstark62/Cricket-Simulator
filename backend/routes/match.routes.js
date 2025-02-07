import express from 'express';
import { createMatch } from '../controllers/match.controller.js';
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router();

router.post('/create', authMiddleware, createMatch);

export default router;