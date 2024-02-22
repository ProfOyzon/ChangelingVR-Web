import { MAIL_EMAIL } from "$env/static/private";
import { transporter } from "$lib/server/email.js";
import { mysqlconnFn } from "$lib/db/mysql";
import { genSecureHash } from "$lib/security.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
    emailToken: async ({ request }) => {
        const data = await request.formData();
        const email = data.get("email").trim();
        const password = data.get("password").trim();
        const confirm = data.get("confirm").trim();
        const validEmails = ["@rit.edu", "@g.rit.edu"]

        // Verify that there was user input
        if (!email || !password || !confirm) {
            return {
                message: "Missing email or password"
            };
        }
        if (email) {
            // Verify an RIT email is being used
            const valid = validEmails.some(endingStr => email.endsWith(endingStr));
            if (!valid) {
                return {
                    message: "Use an RIT email"
                };
            }
        }
        // Verify password and confirm password match
        if (password !== confirm) {
            return {
                message: "Passwords do not match"
            }
        }

        let mysqlconn = await mysqlconnFn();

        // Check for existing email in database
        const emailCheckQuery = await mysqlconn.query(`SELECT * FROM users WHERE email = "${email}"`);

        if (emailCheckQuery[0][0] !== undefined){
            return {
                message: "Email address already in use"
            }
        }

        // Generate token
        const token = generateToken(8);

        // Content in email
        const text = `
        Enter this token to complete the sign up process:
        ${token}

        Kind regards,
        Changeling Web Team
        `;

        const html = `
        <p>Enter this token to complete the sign up process:<br>
        <h1>${token}</h1></p>

        <p>Kind regards,<br>
        Changeling Web Team</p>
        `;

        const message = {
            from: MAIL_EMAIL,
            to: email,
            subject: "Changeling Account Creation Verification",
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

        return { 
            message: `To complete sign up, enter the token that will momentarily be emailed to ${email}`,
            tokenGen: true, 
            email,
            confirm,
            token
        };
    },
    verify: async ({ request }) => {
        const data = await request.formData();
        const email = data.get("email");
        const confirm = data.get("confirm");
        const inputToken = data.get("verification");
        const token = data.get("token");
 
        // Check user entered token matches real token
        if (inputToken !== token) {
            return {
                message: "Incorrect token",
                tokenGen: true,
                email,
                confirm,
                token
            }
        }

        const hashPass = await genSecureHash(confirm);
        let mysqlconn = await mysqlconnFn();
        // Add a new user to database
        try {
            const sql = "INSERT INTO users (email, password) VALUE (?, ?)";
            const values = [email, hashPass];
            const [result, fields] = await mysqlconn.query(sql, values);
        }
        catch (error) {
            console.log(error);
            return error;
        }

        redirect(303, "/");
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