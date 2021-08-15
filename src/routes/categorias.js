const express = require("express");
const categorias = express.Router();
const modelo = require("../models/ModeloCategorias"); //obtener modelo

// Recibir datos
categorias.get("/", async (req, res) => {
  const documentos = await modelo.find();
  //console.log(documentos);
  res.json(documentos);
});
// Recibir datos por id

categorias.get("/:id", async (req, res) => {
  const documentos = await modelo.findById(req.params.id);
  res.json(documentos);
});

// Enviar datos
categorias.post("/", async (req, res) => {
  const { nombre_categoria, descrip_categoria, sub_categoria } = req.body;
  const documento = new modelo({
    nombre_categoria,
    descrip_categoria,
    sub_categoria,
  });
  await documento.save();

  res.json({ status: "Guardado" });
});
// Actualiza
categorias.put("/:id", async (req, res) => {
  const { nombre_categoria, descrip_categoria, sub_categoria } = req.body;
  const newdocumento = {
    nombre_categoria,
    descrip_categoria,
    sub_categoria,
  };
  await modelo.findByIdAndUpdate(req.params.id, newdocumento);

  res.json({ status: "Actualizado" });
});

module.exports = categorias;
