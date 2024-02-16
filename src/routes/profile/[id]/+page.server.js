import { mysqlconnFn } from "$lib/db/mysql";

let id;

export const load = async ( { params }) => {
    id = params.id;
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
    default: async ({ request, fetch }) => {
        // Get values from input fields
        const data = await request.formData();
        const name = data.get("name");
        const email = data.get("email");
        const pfp = data.get("pfp-string");
        const bio = data.get("bio");
        const years = data.getAll("years").toString();
        const teams = data.getAll("teams").toString();
        const roles = data.getAll("roles").toString();
        const portfolio = data.get("portfolio");
        const github = data.get("github");
        const linkedin = data.get("linkedin");

        let pfpBase64;
        if (pfp) {
            // Get base64 string of cropped image without metadata
            let parts = pfp.split(';');
            let mimType = parts[0].split(':')[1];
            let imageData = parts[1].split(',')[1];
        
            pfpBase64 = imageData;
        }
        
        // Send image to server
        const res = await fetch("https://www.changelingvr.com/pfp", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
        },
            body: JSON.stringify({ 
                id: id,
                base64: pfpBase64
            }),
        });
    
        // let mysqlconn = await mysqlconnFn();

        // // Update user's data in database
        // try {
        //     const sql = "UPDATE users SET username = ?, link_email = ?, bio = ?, terms = ?, teams = ?, roles = ?, link_website = ?, link_github = ?, link_linkedin = ? WHERE id = ?";
        //     const values = [name, email, bio, years, teams, roles, portfolio, github, linkedin, id];
        //     const [result, fields] = await mysqlconn.query(sql, values);
        // }
        // catch (error) {
        //     console.log(error);
        //     return error;
        // }

        return { message: "Saved Edits" };
    }
}