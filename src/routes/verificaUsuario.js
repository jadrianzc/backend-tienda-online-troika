const express = require("express");
const verificaUsuario = express.Router();
const modelo = require("../models/ModeloUsuarios");

// Recibir datos
verificaUsuario.get("/:email", async (req, res) => {
  const { email } = req.params;
  const documentos = await modelo.find({
    email_usuario: email,
  });

  res.json(documentos);
});
module.exports = verificaUsuario;
