const express = require("express");
const productos = require("./productos");
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

module.exports = router;
