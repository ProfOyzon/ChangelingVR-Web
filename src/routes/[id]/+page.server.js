import { mysqlconnFn } from "$lib/db/mysql";

export const load = async ( { params }) => {
    const { id } = params;
    console.log(id);
    let mysqlconn = await mysqlconnFn();
  
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