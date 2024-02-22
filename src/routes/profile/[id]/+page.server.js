import { mysqlconnFn } from "$lib/db/mysql";

export const load = async ( { params }) => {
    const id = params.id;
    let mysqlconn = await mysqlconnFn();
    
    // Fetch user's image and check status code for availability 
    const res = await fetch(`https://www.changelingvr.com/image/team/${id}.jpg`);
    const pfpStatus = res.status;
    
    // Pull data for a specific user
    try {
        let results = await mysqlconn
        .query(`SELECT * FROM users WHERE id = ${id}`)
        .then(function ([rows, fields]) {
            return rows;
        });
        
        return {
            results,
            pfpStatus
        };
    } 
    catch (error) {
        console.log(error);
        return error;
    }
}

export const actions = {
    default: async ({ request, params }) => {
        // Get values from input fields
        const id = params.id;
        const data = await request.formData();
        const name = data.get("name").trim();
        const email = data.get("email").trim();
        const bio = data.get("bio").trim();
        const years = data.getAll("years").toString();
        const teams = data.getAll("teams").toString();
        const roles = data.getAll("roles").toString();
        const portfolio = data.get("portfolio").trim();
        const github = data.get("github").trim();
        const linkedin = data.get("linkedin").trim();

        if (bio.length > 550) {
            return {message: "Stop trying to cheat the system!!!"}
        }

        let mysqlconn = await mysqlconnFn();

        // Update user's data in database
        try {
            const sql = "UPDATE users SET username = ?, link_email = ?, bio = ?, terms = ?, teams = ?, roles = ?, link_website = ?, link_github = ?, link_linkedin = ? WHERE id = ?";
            const values = [name, email, bio, years, teams, roles, portfolio, github, linkedin, id];
            const [result, fields] = await mysqlconn.query(sql, values);
        }
        catch (error) {
            console.log(error);
            return error;
        }

        return { message: "Saved Edits" };
    }
}