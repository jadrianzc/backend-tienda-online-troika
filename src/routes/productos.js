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
  // const f_registro_producto = new Date().toLocaleString("es-EC");
  const date = new Date();

  let f_creacion_ordenCompra =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
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

// Actualizar datos
productos.put("/:id", async (req, res) => {
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
  const newdocumento = {
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
  };
  await modelo.findByIdAndUpdate(req.params.id, newdocumento);

  res.json({ status: "Actualizado" });
});

// Eliminar datos
productos.delete("/:id", async (req, res) => {
  await modelo.findByIdAndRemove(req.params.id);

  res.json({ status: "Eliminado" });
});
//ElIMIR TODO LOS DATO PELIGO PELIGRO AAAAAAAAA
productos.delete("/", async (req, res) => {
  await modelo.remove({});

  res.json({ status: "Eliminado" });
});

module.exports = productos;
