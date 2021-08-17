const express = require("express");
const filtramodeloauto = express.Router();
const modelo = require("../models/ModeloProductos");

// Recibir datos
filtramodeloauto.get("/:marca", async (req, res) => {
  const { marca } = req.params;
  console.log(marca);
  const documentos = await modelo.find({
    marca_auto: marca,
  });
  //console.log(documentos);
  res.json(documentos);
});

module.exports = filtramodeloauto;
