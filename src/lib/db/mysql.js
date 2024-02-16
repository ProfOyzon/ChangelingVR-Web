import mysql from "mysql2/promise";
import { DB_HOST, DB_USER, DB_PASS, DB_NAME } from "$env/static/private";

let mysqlconn = null;

// Create a connect with database
export const mysqlconnFn = () => {
    if (!mysqlconn) {
        mysqlconn = mysql.createPool({ 
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASS,
            database: DB_NAME
        });
    }

    return mysqlconn;
}