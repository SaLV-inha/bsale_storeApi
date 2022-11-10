const express = require("express");
const app = express();
const cors = require('cors')

app.use(express.json());

require("dotenv").config();

const port = process.env.PUERTO || 1109;
const cors = require("cors");

const products = require("./products");
const category = require("./category");

app.use(express.json());

app.use(cors());

app.use("/products", products);
app.use("/category", category);

app.listen(port, (req, res) => {
    console.log(`Server on port ${port}`);
});
 