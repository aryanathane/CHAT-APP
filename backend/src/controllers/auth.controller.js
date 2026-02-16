import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";

export const signUp = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Validation checks
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }
        
        // Check if email is valid: regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if user already exists (FIXED: was findOne(email), should be findOne({email}))
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        // Save user and generate token (FIXED: was checking if(user), should be if(newUser))
        await newUser.save();
        generateToken(newUser._id, res);

        // Send welcome email
        try {
            await sendWelcomeEmail(
                newUser.email, 
                newUser.fullName, 
                process.env.CLIENT_URL || "http://localhost:3000"
            );
        } catch (emailError) {
            console.error("Failed to send welcome email:", emailError);
            // Don't fail the signup if email fails
        }

        // Return user data
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic
        });

    } catch (error) {
        console.log("Error in signUp controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error in login controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully." });
}

export const updateProfile=async (_,res)=>{
    
}