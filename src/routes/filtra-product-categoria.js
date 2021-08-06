const express = require("express");
const FiltraProductCatego = express.Router();
const modelo = require("../models/ModeloProductos");

// Recibir datos
FiltraProductCatego.get("/:categoria", async (req, res) => {
  const { categoria } = req.params;
  const documentos = await modelo.find({
    categoria_producto: new RegExp("^" + categoria + "$", "i"),
  });
  //console.log(documentos);
  res.json(documentos);
});

module.exports = FiltraProductCatego;
