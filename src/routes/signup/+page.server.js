import { mysqlconnFn } from "$lib/db/mysql";

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
            const [result, fields] = await mysqlconn
            .query(`INSERT INTO users (email, password) VALUE ("${email}", "${password}")`);
        }
        catch (error) {
            console.error("Got an error!!!");
            console.log(error);
            return error;
        }

        return { message: "Signed Up" };
    }
}