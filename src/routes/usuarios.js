const express = require("express");
const usuarios = express.Router();
const modelo = require("../models/ModeloUsuarios"); //obtener modelo

//Obtener datos
usuarios.get("/", async (req, res) => {
  const documentos = await modelo.find();
  //console.log(documentos);
  res.json(documentos);
});

// Enviar datos
usuarios.post("/", async (req, res) => {
  const {
    nomb_usuario,
    apell_usuario,
    ced_usuario,
    telf_usuario,
    cel_usuario,
    email_usuario,
    contraseña_usuario,
    conf_contraseña,
    f_creacion_usuario,
    rol_usuario,
  } = req.body;
  const documento = new modelo({
    nomb_usuario,
    apell_usuario,
    ced_usuario,
    telf_usuario,
    cel_usuario,
    email_usuario,
    contraseña_usuario,
    conf_contraseña,
    f_creacion_usuario,
    rol_usuario,
  });
  await documento.save();

  res.json({ status: "Guardado" });
});

module.exports = usuarios;
