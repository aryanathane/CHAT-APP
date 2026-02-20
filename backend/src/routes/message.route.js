import express from "express";
import {
  getMessagesByUserId,
  sendMessages,
  getCharPartners,
  getAllContacts,
} from "../controllers/message.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const messageRouter = express.Router();

messageRouter.get("/contacts", protectRoute, getAllContacts);       // get all users
messageRouter.get("/chat-partners", protectRoute, getCharPartners); // get users you've chatted with
messageRouter.get("/:id", protectRoute, getMessagesByUserId);       // get messages with a specific user
messageRouter.post("/send/:id", protectRoute, sendMessages);        // send a message to a specific user

export default messageRouter;