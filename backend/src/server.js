import express from "express";
import 'dotenv/config';
import path from "path";
const app=express();
const port=process.env.PORT || 3000;

const __dirname=path.resolve();

app.get("/",(req,res)=>{
    res.send("we are live");
})

//make ready for deployment
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
    })
}

app.listen(port,()=>{
    console.log(`server is running on port ${port}`); 
})