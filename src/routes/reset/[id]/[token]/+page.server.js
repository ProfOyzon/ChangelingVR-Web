import { redirect } from "@sveltejs/kit";
import { mysqlconnFn } from "$lib/db/mysql";
import {checkPass} from "$lib/security.js";

export const load = async ( { params }) => {
    const id = params.id;
    const token = params.token;

    // Pull reset token for a specific user
    let mysqlconn = await mysqlconnFn();

    const sql = "SELECT reset_token FROM users WHERE id = ?"
    const values = [id]
    const [result, fields] = await mysqlconn.query(sql, values);

    // Redirect if there is no result from sql query
    if (!result[0]) {
        redirect(301, "/");
    }

    // Redirect if token doesn't match database token
    const passCheck = await checkPass(token, result[0].reset_token); 
    if (!passCheck) {
        redirect(301, "/");
    }
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const password = data.get("password");
        const confirm = data.get("confirm");

        // Verify that there was user input
        if (!password || !confirm) {
            return {
                message: "Missing password"
            };
        }
        // Verify password and confirm password match
        else if (password !== confirm) {
            return {
                message: "Passwords do not match"
            }
        }

        let mysqlconn = await mysqlconnFn();


        return { message: "New Password Saved" };
    }
}