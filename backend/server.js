import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"
import matchRoutes from "./routes/match.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true, 
    })
);

connectDB();

app.use("/auth", authRoutes);
app.use("/match", matchRoutes);

app.get("/", (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
});