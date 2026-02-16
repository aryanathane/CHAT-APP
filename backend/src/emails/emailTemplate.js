export function createWelcomeTemplate(name, clientURL) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to CHATIFY</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
        <tr>
            <td align="center">
                <!-- Email Container -->
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 50px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: 700;">CHATIFY</h1>
                            <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px; letter-spacing: 2px;">Connect with everyone, everywhere</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 50px 40px; background-color: #ffffff;">
                            <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 26px; font-weight: 600;">Welcome, ${name}! 👋</h2>
                            <p style="margin: 0 0 25px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Your account is now active and ready to use. We're excited to have you as part of the CHATIFY community!
                            </p>
                            
                            <!-- Features Section -->
                            <div style="background-color: #f9fafb; border-radius: 10px; padding: 30px; margin: 30px 0; border: 1px solid #e5e7eb;">
                                <h3 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px; font-weight: 600; text-align: center;">What's waiting for you</h3>
                                
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="padding: 12px 0;">
                                            <p style="margin: 0; color: #1f2937; font-size: 15px; line-height: 1.6;">
                                                <strong style="color: #4f46e5;">💬 Instant Messaging</strong><br>
                                                <span style="color: #6b7280; font-size: 14px;">Send messages in real-time to friends and groups</span>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0;">
                                            <p style="margin: 0; color: #1f2937; font-size: 15px; line-height: 1.6;">
                                                <strong style="color: #7c3aed;">👥 Group Conversations</strong><br>
                                                <span style="color: #6b7280; font-size: 14px;">Create and join groups with unlimited members</span>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0;">
                                            <p style="margin: 0; color: #1f2937; font-size: 15px; line-height: 1.6;">
                                                <strong style="color: #4f46e5;">📎 File Sharing</strong><br>
                                                <span style="color: #6b7280; font-size: 14px;">Share photos, documents, and files securely</span>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0;">
                                            <p style="margin: 0; color: #1f2937; font-size: 15px; line-height: 1.6;">
                                                <strong style="color: #7c3aed;">🔒 Privacy First</strong><br>
                                                <span style="color: #6b7280; font-size: 14px;">Your conversations are secure and private</span>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 35px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${clientURL}" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; letter-spacing: 0.5px;">
                                            Open CHATIFY
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <div style="margin: 35px 0 0 0; text-align: center; background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #fbbf24;">
                                <p style="margin: 0 0 8px 0; color: #92400e; font-size: 14px; font-weight: 600;">
                                    💡 Quick Tip
                                </p>
                                <p style="margin: 0; color: #78350f; font-size: 13px; line-height: 1.5;">
                                    Set up your profile picture and status to personalize your account!
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                                Questions? We're here to help at <a href="mailto:support@chatify.com" style="color: #4f46e5; text-decoration: none;">support@chatify.com</a>
                            </p>
                            <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                                © 2024 CHATIFY. All rights reserved.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}