const express = require("express");
const conection = require("./dataBase");
const debug = require("debug");

const logger = debug("constroller:products");

let products = express.Router();

products.get("/", (req, res) => {
    let order = req.query["order"];
    let sort = req.query["sort"];
    let search = req.query['search'];
    let limit = req.query["limit"];

    if (limit && isNaN(limit)) {
        return res.status(400).send({ msg: "Debe ingresar un parametro correcto" });
    }

    if (limit > 0) {
        conection.query(
            `SELECT * FROM product LIMIT ?`,
            parseInt(limit),
            (err, rows) => {
                if (err) {
                    logger(err);
                    return res.status(500).send({ msg: "fALLA DEL SERVIDOR" });
                }
                return res.status(200).send(rows);
        });
        return
    }

    let sql = "SELECT * FROM product ORDER BY";
    if (order == "name" || order == "price") {
        sql += " " + order || " " + price;
        if (sort == "asc" || sort == "desc") {
            sql += " " + sort.toLocaleUpperCase();
            conection.query(sql, (err, rows) => {
                if (err) {
                    logger(err);
                    return res.status(500).send({ msg: "fALLA DEL SERVIDOR" });
                }
                return res.status(200).send(rows);
            });
         return   
        }
    }

    let desc = req.query["desc"];
    if (desc == "si") {
        conection.query(
            "SELECT * FROM product WHERE discount > 0 ",
            (err, rows) => {
                if (err) {
                    logger(err);
                    return res.status(500).send({ msg: "fALLA DEL SERVIDOR" });
                }
                return res.status(200).send(rows);
            }
        );
        return
    }

    if (search) {
        let quesearch = '%' + search + '%'

        if (search.length < 3) {

            return res.status(400).send({ msg: `El minimo de caracteres para realizar un busqueda es de 3` })
        }
        conection.query("SELECT * FROM product WHERE name  like ? ", quesearch, (err, rows) => {
            if (rows.length == 0) {
                return res.status(404).send({ msg: `No se encuentra articulo con ${search}` })
            }
            if (err) {
                return res.status(500).send({ msg: "fALLA DEL SERVIDOR" });
            }
            return res.send(rows);
        });

        return;
    }



    conection.query("SELECT * FROM product ", (err, rows) => {
        if (err) {
            logger(err)
            return res.status(500).send({ msg: "fALLA DEL SERVIDOR" });
        }
        return res.send(rows);
    });

});

products.get("/:id", (req, res) => {
    let id = req.params.id;
    if (id < 1 || isNaN(id)) {
        logger("ID not valido");
        return res.status(404).send({ msg: "ID deberia ser un número" });

    }

    conection.query("SELECT product.*, category.name as category_name FROM product JOIN category ON product.category = category.id WHERE product.id = ?", id, (err, row) => {
        if (err) {
            return res.status(500).send({ msg: "fALLA DEL SERVIDOR" });
        }

        if (row.length < 1) {
            logger("ID not exist!");
            return res.status(404).send({ msg: "ID NOT EXIST" });
        }
        
        logger(row)
        
        return res.status(200).send({
            name: row[0].name,
            url_image: row[0].url_image,
            subtotal: row[0].price,
            discount: row[0].discount,
            price: row[0].price - row[0].discount,
            category: row[0].category_name,
        });
    });
});

module.exports = conection;
module.exports = products;
