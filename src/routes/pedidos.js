const express = require("express");
const pedidos = express.Router();
const modelo = require("../models/ModeloOrdenCompra"); //obtener modelo

/*EJEMPLO*/

// Recibir datos
pedidos.get("/", async (req, res) => {
  const documentos = await modelo.find();
  //console.log(documentos);
  res.json(documentos);
});

module.exports = pedidos;
