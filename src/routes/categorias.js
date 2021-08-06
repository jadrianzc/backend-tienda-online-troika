const express = require("express");
const categorias = express.Router();
const modelo = require("../models/ModeloCategorias"); //obtener modelo

// Recibir datos
categorias.get("/", async (req, res) => {
  const documentos = await modelo.find();
  //console.log(documentos);
  res.json(documentos);
});

// Enviar datos
categorias.post("/", async (req, res) => {
  const { nombre_categoria, descrip_categoria } = req.body;
  const documento = new modelo({
    nombre_categoria,
    descrip_categoria,
  });
  await documento.save();

  res.json({ status: "Guardado" });
});

module.exports = categorias;
