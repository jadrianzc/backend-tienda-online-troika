const mongoose = require("mongoose");
const { Schema } = mongoose;
/*EJEMPLO*/
const ProductosShema = new Schema({
  imgurl: { type: Array, required: true },
  codigo_producto: { type: String, required: true },
  nom_producto: { type: String, required: true },
  descrip_producto: { type: String, required: true },
  categoria_producto: { type: String, required: true },
  precio_producto: { type: Number, required: true },
  marca_producto: { type: String, required: false },
  modelo_producto: { type: String, required: true },
  cantidad_producto: { type: Number, required: true },
  f_registro_producto: { type: String, required: false },
});

module.exports = mongoose.model("productos", ProductosShema);
