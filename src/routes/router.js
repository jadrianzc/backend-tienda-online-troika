const express = require("express");
const productos = require("./productos");
const usuarios = require("./usuarios");
//const cloudinaryRouter = require("./cloudinary");
const router = express.Router();

/*
 * Ruta principal de la api
 */
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Bienvenido a la API.",
  });
});

/*
 * Demás rutas
 */
router.use("/productos", productos);
router.use("/usuarios", usuarios);

module.exports = router;
