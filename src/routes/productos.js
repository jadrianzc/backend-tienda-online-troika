const express = require("express");
const productos = express.Router();
const modelo = require("../models/ModeloProductos"); //obtener modelo

/*EJEMPLO*/

// Recibir datos
productos.get("/", async (req, res) => {
  const documentos = await modelo.find();
  //console.log(documentos);
  res.json(documentos);
});

// Recibir datos por id

productos.get("/:id", async (req, res) => {
  const documentos = await modelo.findById(req.params.id);
  console.log(documentos);
  res.json(documentos);
});

// Enviar datos
productos.post("/", async (req, res) => {
  const f_registro_producto = new Date().toLocaleString("es-EC");
  const {
    imgurl,
    codigo_producto,
    nom_producto,
    descrip_producto,
    categoria_producto,
    precio_producto,
    marca_auto,
    modelo_auto,
    modelo_producto,
    cantidad_producto,
    mas_vendidos,
  } = req.body;
  const documento = new modelo({
    imgurl,
    codigo_producto,
    nom_producto,
    descrip_producto,
    categoria_producto,
    precio_producto,
    marca_auto,
    modelo_auto,
    modelo_producto,
    cantidad_producto,
    mas_vendidos,
    f_registro_producto,
  });
  await documento.save();

  res.json({ status: "Guardado" });
});
/*
// Actualizar datos
productos.put("/:id", async (req, res) => {
  const {
    imgurl,
    imgurl2,
    titulo,
    precio,
    talla,
    cantidad,
    tipo,
    masvendido,
  } = req.body;
  const newdocumento = {
    imgurl,
    imgurl2,
    titulo,
    precio,
    talla,
    cantidad,
    tipo,
    masvendido,
  };
  await modelo.findByIdAndUpdate(req.params.id, newdocumento);

  res.json({ status: "Actualizado" });
});

// Eliminar datos
productos.delete("/:id", async (req, res) => {
  await modelo.findByIdAndRemove(req.params.id);

  res.json({ status: "Eliminado" });
});
*/
module.exports = productos;
