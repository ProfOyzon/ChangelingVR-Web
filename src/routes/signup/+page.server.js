import { mysqlconnFn } from "$lib/db/mysql";
import { genSecureHash } from "$lib/security.js";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");
        const confirm = data.get("confirm");
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

        return { message: "Signed Up" };
    }
}