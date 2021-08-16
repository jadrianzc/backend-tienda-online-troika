const express = require("express");
const buscaProducto = express.Router();
const modelo = require("../models/ModeloProductos"); //obtener modelo

///
buscaProducto.get("/:nombre", async (req, res) => {
  const { nombre } = req.params;
  const documentos = await modelo.find({
    descrip_producto: { $regex: ".*" + nombre + ".*", $options: "i" },
  });
  //console.log(documentos);
  res.json(documentos);
});

module.exports = buscaProducto;
