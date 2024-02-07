import { mysqlconnFn } from "$lib/db/mysql";
import { checkPass, jwtToken } from "$lib/security.js";
import { redirect } from "@sveltejs/kit"

export const actions = {
    default: async (event) => {
        const request = event["request"];
        const data = await request.formData();
        const email = data.get("email");
        const givenPassword = data.get("password");

        // Verify that there was user input
        if (!email || !givenPassword) {
            return {
                message: "Missing email or password"
            };
        }

        let mysqlconn = await mysqlconnFn();
        let password ,id;
        // Add a new user to database
        try {
            let values = (await mysqlconn.query(`SELECT email, password, id from users WHERE email="${email}"`))[0][0];
            password = values.password;
            id = values.id;
        }
        catch (error) {
            console.log(error);
            return error;
        }

        
        if ((await checkPass(givenPassword, password))){
            event.cookies.set('AuthorizationToken', `Bearer ${jwtToken(id, email)}`, {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 1 day
            });

            redirect(303, `/${id}`);
        }
        else{
            return { message: "Incorrect Credentials" };
        }
    }
}