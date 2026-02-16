import { resendClient, sender } from "../config/resend.js";
import { createWelcomeTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    try {
        const { data, error } = await resendClient.emails.send({
            from: `${sender.name} <${sender.email}>`,
            to: email,
            subject: "Welcome to CHATIFY!",
            html: createWelcomeTemplate(name, clientURL)
        });

        if (error) {
            console.error("Error sending welcome email:", error);
            throw new Error(`Failed to send welcome email: ${error.message}`);
        }

        console.log("Welcome email sent successfully to:", email);
        return data;
        
    } catch (err) {
        console.error("Unexpected error in sendWelcomeEmail:", err);
        throw err;
    }
};