import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "$env/static/private";

let mysqlconn = null;

export const mysqlconnFn = () => {
    if (!mysqlconn) {
        mysqlconn = mysql.createConnection({ 
            host: "mysql.changelingvr.com",
            user: "changelingadmin",
            password: "XanaAdH0cStud!0",
            database: "changelingmembers"
        });
    }

    return mysqlconn;
}