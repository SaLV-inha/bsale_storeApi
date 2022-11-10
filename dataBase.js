require("dotenv").config();
const mysql = require("mysql2");

let conection = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    database: process.env.database,
    password: process.env.password,
    debug: false,
    connectTimeout: 5000,
    connectionLimit: 1

});


module.exports = conection;