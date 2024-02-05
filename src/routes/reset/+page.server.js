import { MAIL_EMAIL } from "$env/static/private";
import { transporter } from "$lib/server/email.js";
import { mysqlconnFn } from "$lib/db/mysql";
import { genSecureHash } from "$lib/security.js";

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

        let mysqlconn = await mysqlconnFn();
        const token = generateToken(16);
        const hashToken = await genSecureHash(token);

        // Update user's reset_token in database
        try {
            const sql = "UPDATE users SET reset_token = ? WHERE email = ?";
            const values = [hashToken, email];
            const [result, fields] = await mysqlconn.query(sql, values);
        }
        catch (error) {
            console.log(error);
            return error;
        }

        let id;
        // get id of a specific user by email
        try {
            const sql = "SELECT id, email FROM users WHERE email = ?"
            const values = [email]
            const [result, fields] = await mysqlconn.query(sql, values);
            id = result[0].id;
        } 
        catch (error) {
            console.log(error);
            return error;
        }
        
        // Content in email
        const text = `
        Someone has requested a password reset.
        
        Use this link to reset your password:
        http://localhost:5173/reset/${id}/${token}

        If this was a mistake, just ignore this email and nothing will happen.

        Kind regards,
        Changeling Web Team
        `;

        const html = `
        <p>Someone has requested a password reset.</p?
        
        <p>Use this link to reset your password:<br>
        <a target="_blank" href="http://localhost:5173/reset/${id}/${token}">http://localhost:5173/reset/${id}/${token}</a></p>

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

const generateToken = (length) => {
    const chars ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( let i = 0; i < length; i++ ) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}