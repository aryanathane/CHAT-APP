import jwt from "jsonwebtoken"
import User from "../model/user.model.js";

export const protectRoute=async (req,res,ext)=>{
    
    try {
        const token=req.cookies.jwt
        if(!token){
            res.status(400).json({message:"Unauthorized - No token provided"});
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(400).json({message:"Unauthorized - No token provided"});
        }

        const user=await User.findOne(decoded.userId);
    } catch (error) {
        
    }
}