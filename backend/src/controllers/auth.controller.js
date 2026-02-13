import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/utils.js";
export const signUp=async (req,res)=>{
    const {fullName,email,password}=req.body;

    try {
        if(!fullName || !email || !password){
            res.status(400).json({message:"All fields are required!"})
        }
        if(password.length<6){
            res.status(400).json({message:"Password length must be ateast 6."})
        }
        // check if emailis valid: regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const user=await User.findOne(email);
        if(user){
            return res.status(400).json({ message: "User already exits." });
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            fullName,
            email,
            password:hashedPassword
        });

        if(user){
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                ProfilePic:newUser.profilePic
            })
        }
        else{
            res.status(400).json("Invalid user data.")
        }

    } catch (error) {
        console.log("Error in signUp controller.",error);
        res.status(400).json({message:"Internal server error"});
    }
}