import arcjet from "../config/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await arcjet.protect(req);

    // Check for spoofed bots regardless of deny decision
    if (isSpoofedBot(decision)) {
      return res.status(403).json({ message: "Spoofed bot detected. Access denied." });
    }

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot detected. Access denied." });
      }

      // Fallback for any other deny reason
      return res.status(403).json({ message: "Access denied." });
    }

    next();
  } catch (error) {
    console.log("arcjetProtection error.", error);
    next();
  }
};