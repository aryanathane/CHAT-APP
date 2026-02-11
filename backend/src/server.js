import express from "express";
import 'dotenv/config'

const app=express();
const port=process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("we are live");
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`); 
})