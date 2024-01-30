import { mysqlconnFn } from "$lib/db/mysql";
import { genSecureHash } from "$lib/security.js";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        // Verify that there was user input for both
        if (!email || !password) {
            return {
                message: "Missing email or password"
            };
        }
        
        let mysqlconn = await mysqlconnFn();

        // Add a new user to database
        try {
            const sql = "INSERT INTO users (email, password) VALUE (?, ?)";
            const values = [email, password];
            const [result, fields] = await mysqlconn.query(sql, values);
        }
        catch (error) {
            console.error("Got an error!!!");
            console.log(error);
            return error;
        }

        return { message: "Signed Up" };
    }
}