import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "$env/static/private";

let mysqlconn = null;

export function mysqlconnFn() {
    if (!mysqlconn) {
        mysqlconn = mysql.createConnection({ 
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME
        });
        console.log(mysqlconn);
    }

    return mysqlconn;
}