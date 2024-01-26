import { mysqlconnFn } from "$lib/db/mysql";

export const load = async ( { params }) => {
    const { id } = params;
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