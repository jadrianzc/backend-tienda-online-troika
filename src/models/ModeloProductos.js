const mongoose = require("mongoose");
const { Schema } = mongoose;
/*EJEMPLO*/
const ProductosShema = new Schema({
  imgurl: { type: String, required: false },
  codigo_producto: { type: String, required: true },
  nom_producto: { type: String, required: true },
  descrip_producto: { type: String, required: true },
  categoria_producto: { type: String, required: true },
  precio_producto: { type: Number, required: true },
  marca_auto: { type: String, required: false },
  modelo_auto: { type: String, required: false },
  modelo_producto: { type: String, required: true },
  cantidad_producto: { type: Number, required: true },
  mas_vendidos: { type: Boolean, required: false },
  f_registro_producto: { type: String, required: false },
});

module.exports = mongoose.model("productos", ProductosShema);
