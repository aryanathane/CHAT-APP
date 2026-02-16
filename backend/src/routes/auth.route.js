import express from "express";
import { login, logout, signUp, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter=express.Router();

authRouter.post("/signup",signUp);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.post("/updateprofile",protectRoute,updateProfile);




export default authRouter;