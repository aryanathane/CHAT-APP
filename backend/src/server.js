import express from "express";
import 'dotenv/config';
import path from "path";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";

const app=express();
const port=process.env.PORT || 3000;

const __dirname=path.resolve();

app.get("/",(req,res)=>{
    res.send("we are live");
})
app.use("/api/auth",authRouter);

//make ready for deployment
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
    })
}


const startServer=()=>{
    try {
        app.listen(port,()=>{
            connectDB()
            console.log(`server is started at port ${port}`);          
        })
    } catch (error) {
        console.error('Connection failed:', error);
        process.exit(1);
    }
};

startServer();