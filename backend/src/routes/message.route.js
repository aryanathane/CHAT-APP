import express from "express";
import { getAllContacts } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const messageRouter=express.Router();

messageRouter.get("/contacts",protectRoute,getAllContacts);

export default messageRouter;