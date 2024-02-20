import { redirect } from "@sveltejs/kit";
import { mysqlconnFn } from "$lib/db/mysql";
import { genSecureHash, checkPass } from "$lib/security.js";


export const load = async ( { params }) => {
    const id = params.id;
    const token = params.token;

    // Pull reset token for a specific user
    let mysqlconn = await mysqlconnFn();

    const sql = "SELECT id, reset_token FROM users WHERE id = ?"
    const values = [id]
    const [result, fields] = await mysqlconn.query(sql, values);

    // Redirect if there is no result from sql query
    if (!result[0]) {
        redirect(302, "/");
    }

    if (!token || !result[0].reset_token){
        redirect(302, "/");
    }

    // Redirect if token doesn't match database token
    const passCheck = await checkPass(token, result[0].reset_token); 
    if (!passCheck) {
        redirect(302, "/");
    }
    return {
        result
    }
}

export const actions = {
    default: async ({ request, params }) => {
        const id = params.id;
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
        if (password !== confirm) {
            return {
                message: "Passwords do not match"
            }
        }

        const hashPass = await genSecureHash(confirm);
        let mysqlconn = await mysqlconnFn();

        // Update user's password and reset token in database
        try {
            const sql = "UPDATE users SET password = ?, reset_token = ? WHERE id = ?";
            const values = [hashPass, null, id];
            const [result, fields] = await mysqlconn.query(sql, values);
        }
        catch (error) {
            console.log(error);
            return error;
        }

        return { message: "New Password Saved" };
    }
}