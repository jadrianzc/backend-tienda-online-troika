const mongoose = require("mongoose");
const { Schema } = mongoose;
/*EJEMPLO*/
const CategoriasShema = new Schema({
  nombre_categoria: { type: String, required: true },
  descrip_categoria: { type: String, required: false },
  sub_categoria: { type: Array, required: true },
});

module.exports = mongoose.model("categorias", CategoriasShema);
