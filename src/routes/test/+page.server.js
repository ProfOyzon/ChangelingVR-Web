import { mysqlconnFn } from "$lib/db/mysql";

export const load = async () => {
    let mysqlconn = await mysqlconnFn();
  
    try {
        let results = await mysqlconn
        .query("SELECT * FROM users")
        .then(function ([rows, fields]) {
            return rows;
        });
        
        return {
            data:results
        };
    } 
    catch (error) {
    console.error("Got an error!!!");
    console.log(error);
    return error;
    }
}