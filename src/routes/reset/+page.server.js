import { MAIL_EMAIL } from "$env/static/private";
import { transporter } from "$lib/server/email.js";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const email = data.get("email");
 
        // Verify that there was user input
        if (!email) {
            return {
                message: "Missing email"
            };
        }

        const text = `
        Someone has requested a password reset.
        
        Use this link to reset your password:
        https://changelingvr-web.vercel.app/

        If this was a mistake, just ignore this email and nothing will happen.

        Kind regards,
        Changeling Web Team
        `;

        const html = `
        <p>Someone has requested a password reset.</p?
        
        <p>Use this link to reset your password:<br>
        <a target="_blank" href="https://changelingvr-web.vercel.app/">https://changelingvr-web.vercel.app/</a></p>

        <p>If this was a mistake, just ignore this email and nothing will happen.</p>

        <p>Kind regards,<br>
        Changeling Web Team</p>
        `;

        const message = {
            from: MAIL_EMAIL,
            to: email,
            subject: "Reset Your Password",
            text: text,
            html: html
        }

        const sendEmail = async (message) => {
            await new Promise((resolve, reject) => {
                transporter.sendMail(message, (err, info) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        resolve(info);
                    }
                });
            });
        }
        
        await sendEmail(message);
        return { success: "Email Sent" };
    }
}