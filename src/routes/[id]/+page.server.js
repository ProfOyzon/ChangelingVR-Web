import { mysqlconnFn } from "$lib/db/mysql";

let id = "";

export const load = async ( { params }) => {
    id = params.id;
    let mysqlconn = await mysqlconnFn();
  
    // Pull data for a specific user
    try {
        let results = await mysqlconn
        .query(`SELECT * FROM users WHERE id = ${id}`)
        .then(function ([rows, fields]) {
            return rows;
        });
        
        return {
            results
        };
    } 
    catch (error) {
        console.error("Got an error!!!");
        console.log(error);
        return error;
    }
}

export const actions = {
    default: async ({ request }) => {
        // Get values from input fields
        const data = await request.formData();
        const name = data.get("name");
        const email = data.get("email");
        const bio = data.get("bio")
        const term = data.get("term");
        const team = data.get("team");
        const role = data.get("role");
        const portfolio = data.get("portfolio");
        const github = data.get("github");
        const linkedin = data.get("linkedin");
        
        let mysqlconn = await mysqlconnFn();

        // Update user's data in database
        try {
            const [result, fields] = await mysqlconn
            .query(`UPDATE users SET username = "${name}", link_email = "${email}", bio = "${bio}", terms = "${term}", teams = "${team}", 
            roles = "${role}", link_website = "${portfolio}", link_github = "${github}", link_linkedin = "${linkedin}"
            WHERE id = ${id}`);
        }
        catch (error) {
            console.error("Got an error!!!");
            console.log(error);
            return error;
        }

        return { message: "Saved Edits" };
    }
}