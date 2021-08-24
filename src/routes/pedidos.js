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

pedidos.get("/:estado", async (req, res) => {
  const { estado } = req.params;
  const documentos = await modelo.find({
    estado: new RegExp("^" + estado + "$", "i"),
  });
  //console.log(documentos);
  res.json(documentos);
});

pedidos.put("/:id", async (req, res) => {
  const { estado } = req.body;
  const newdocumento = {
    estado,
  };
  await modelo.findByIdAndUpdate(req.params.id, newdocumento);
  res.json({ status: "Actualizado" });
});

module.exports = pedidos;
