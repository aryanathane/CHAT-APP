import { resendClient, sender } from "../config/resend.js";
import { createWelcomeTemplate } from "./emailTemplate.js";

const isDevelopment = process.env.NODE_ENV !== "production";
const TEST_EMAIL = "zorororonoa992272@gmail.com";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    try {
        const recipient = isDevelopment ? TEST_EMAIL : email; // ✅ redirect to yourself in dev

        const { data, error } = await resendClient.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: recipient,
            subject: "Welcome to CHATIFY!",
            html: createWelcomeTemplate(name, clientURL)
        });

        if (error) {
            console.error("Error sending welcome email:", error);
            throw new Error(`Failed to send welcome email: ${error.message}`);
        }

        console.log("Welcome email sent successfully to:", recipient);
        return data;

    } catch (err) {
        console.error("Unexpected error in sendWelcomeEmail:", err);
        throw err;
    }
};