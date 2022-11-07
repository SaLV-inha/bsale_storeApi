const express = require("express");
require("dotenv").config();
const mysql = require("mysql2");

var conection = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    database: process.env.database,
    password: process.env.password,
    debug: false
    });

let category = express.Router();

category.get("/", (req, res) => {
    conection.query("SELECT * FROM category",  (err, rows) => {
        if (err) {
            throw err;
        } else {
            res.send(rows);
        }
    });
});

category.get("/:id", (req, res) => {
    let id = req.params.id;
    conection.query("SELECT * FROM category WHERE id = ?", id, (err, row) => {
        if (err) {
            throw err;
        } else {
            res.send(row);
        }
    });
});


module.exports = conection;
module.exports = category;
