const express = require("express");
const productos = require("./productos");
const categorias = require("./categorias");
const usuarios = require("./usuarios");
const FiltraProductCatego = require("./filtra-product-categoria");
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
router.use("/categorias", categorias);
router.use("/usuarios", usuarios);
router.use("/FiltraProductCatego", FiltraProductCatego);

module.exports = router;
