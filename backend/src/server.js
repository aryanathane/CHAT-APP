import express from "express";
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import path from "path";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

const app = express();

// ✅ Body parsing middleware must come before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 3000;
const __dirname = path.resolve();

app.get("/", (req, res) => {
    res.send("we are live");
});

app.use("/api/auth", authRouter);
app.use("/api/message",messageRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

// ✅ Connect to DB before starting the server, not inside app.listen
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Connection failed:', error);
        process.exit(1);
    }
};

startServer();