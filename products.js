const express = require("express");
require("dotenv").config();
const mysql = require("mysql2");

var conection = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    database: process.env.database,
    password: process.env.password,
    debug: false,
});

let products = express.Router();

products.get("/", (req, res) => {
    conection.query("SELECT * FROM product", (err, rows) => {
    if (err) {
        throw err;
    } else {
        res.send(rows);
    }
    });
});

products.get("/:id", (req, res) => {
    let id = req.params.id;
    conection.query("SELECT * FROM product WHERE id = ?", id, (err, row) => {
    if (err) {
        throw err;
    } else {
        res.send(row);
    }
    });
});

products.get("/category/:id", (req, res) => {
    let category = req.params.id;
    console.log(category)
    conection.query("SELECT * FROM product WHERE category = ?", category, (err, row) => {
        if (err) {
        throw err;
    } else {
        res.send(row);
    }
    });
});



module.exports = conection;
module.exports = products;
