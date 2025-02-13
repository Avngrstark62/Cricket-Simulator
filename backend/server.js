import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"
import matchRoutes from "./routes/match.routes.js"
import inningRoutes from "./routes/inning.route.js"


const app = express();
const PORT = process.env.PORT || 5000;
// const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    process.env.FRONTEND_BASE_URL, // Deployed frontend
    "http://localhost:5173", // Local development (Vite default)
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

connectDB();

app.use("/auth", authRoutes);
app.use("/match", matchRoutes);
app.use("/inning", inningRoutes)

app.get("/", (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});