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

        const message = {
            from: MAIL_EMAIL,
            to: email,
            subject: "Reset Your Password",
            text: "",
            html: ""
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