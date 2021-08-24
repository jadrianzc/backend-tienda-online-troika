const express = require("express");

const productos = require("./productos");
const categorias = require("./categorias");
const usuarios = require("./usuarios");
const pedidos = require("./pedidos");

const FiltraProductCatego = require("./filtra-product-categoria");
const buscaProducto = require("./buscaProducto");
const verificaUsuario = require("./verificaUsuario");
const filtramodeloauto = require("./filtra-modelo-auto");
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
router.use("/pedidos", pedidos);
// router.use("/usuarios", usuarios);
router.use("/FiltraProductCatego", FiltraProductCatego);
router.use("/filtramodeloauto", filtramodeloauto);
router.use("/buscaProducto", buscaProducto);
router.use("/verificaUsuario", verificaUsuario);

module.exports = router;
