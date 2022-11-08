const express = require("express");
const conection = require('./dataBase')
const debug =require('debug')


const logger = debug('constroller:categories')


let category = express.Router();

category.get("/", (req, res) => {
    conection.query("SELECT * FROM category",  (err, rows) => {
        if (err) {
            return res
            .status(500)
            .send({ msg: "fALLA DEL SERVIDOR" });
        } else {
            return res
            .status(200)
            .send(rows);
        }
    });
});

category.get("/:id", (req, res) => {
    let id = req.params.id;
    if (isNaN(id)) {
        return res
        .status(400)
        .send({msg: "El id a ingresar debe ser un número"});
        }    
    conection.query("SELECT * FROM category WHERE id = ?", id, (err, row) => {
        if (row.length<1) {
            logger('ID not exist!');
            return res
            .status(404)
            .send({ msg: "ID NOT EXIST" });
        }if (err) {
            logger(err);
            return res
            .status(500)
            .send({ msg: "fALLA DEL SERVIDOR" });
    
        } else {
            return res
            .status(200)
            .send(row);
        }
    });
});

category.get("/:id/products/", (req, res) => {
    let category = req.params.id;
    conection.query("SELECT * FROM product WHERE category = ?", category, (err, row) => {
        if (err) {
            logger(err);
            return res
            .status(500)
            .send({ msg: "fALLA DEL SERVIDOR" });
        }

        if (row.length<1) {
            logger('NOt exist products');
            return res
            .status(404)
            .send({ msg: "CATEGORY NOT EXIST" });
        }

        res
        .status(200)
        .send(row);
    });
});


module.exports = conection;
module.exports = category;
