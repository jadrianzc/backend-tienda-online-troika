const mongoose = require("mongoose");
const { Schema } = mongoose;
/*EJEMPLO*/ 
const TaskShema = new Schema({
  imgurl: { type: Array, required: true },
  titulo: { type: String, required: true },
  precio: { type: Number, required: true },
  talla: { type: Array, required: true },
  cantidad: { type: Number, required: true },
  tipo: { type: String, required: true },
  masvendido: { type: Boolean, required: false },
});

module.exports = mongoose.model("Task", TaskShema);
