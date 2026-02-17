import express from "express";
import { checkAuth, login, logout, signUp, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter=express.Router();

authRouter.post("/signup",signUp);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.put("/updateprofile",protectRoute,updateProfile);
authRouter.get("/check", protectRoute, checkAuth);


export default authRouter;