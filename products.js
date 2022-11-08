const express = require("express");
const conection = require("./dataBase");
const debug = require("debug");

const logger = debug("constroller:products");

let products = express.Router();

products.get("/", (req, res) => {
    let limit = req.query["limit"];
    if (limit && isNaN(limit)) {
        return res
        .status(400)
        .send({ msg: "Debe ingresar un parametro correcto" });
    }
    
    
    if (limit > 0) {
        conection.query(`SELECT * FROM product LIMIT ?`, parseInt(limit), (err, rows) => {
            if (err) {
            logger(err);

            return res.status(500).send({ msg: "fALLA DEL SERVIDOR" });
            }

            return res.status(200).send(rows);
        });
    } 

    let order = req.query["order"];
    console.log(order)
    if (order == "name") {
        conection.query(`SELECT * FROM product ORDER BY ${order}`,(err, rows) => {
        if (err) {
            logger(err);
            return res.status(500).send({ msg: "fALLA DEL SERVIDOR" });
        }
            return res.status(200).send(rows);
        });
    }
    

    if (!limit && !order ) {
        conection.query("SELECT * FROM product", (err, rows) => {
        if (err) {
            return res.status(500).send({ msg: "fALLA DEL SERVIDOR" });
        }
        return res.send(rows);
        });
    }
});

products.get("/:id", (req, res) => {
    let id = req.params.id;
    conection.query("SELECT * FROM product WHERE id = ?", id, (err, row) => {
    if (row.length < 1) {
        logger("ID not exist!");
        return res.status(404).send({ msg: "ID NOT EXIST" });
    }
    if (err) {
        return res.status(500).send({ msg: "fALLA DEL SERVIDOR" });
    } else {
        return res.status(200).send({
        name: row[0].name,
        url_image: row[0].url_image,
        subtotal: row[0].price,
        discount: row[0].discount,
        price: row[0].price - row[0].discount,
        category: row[0].category,
        });
    }
    });
});

module.exports = conection;
module.exports = products;
