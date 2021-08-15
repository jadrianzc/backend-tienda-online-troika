const mongoose = require("mongoose");
const { Schema } = mongoose;
/*EJEMPLO*/
const UsersShema = new Schema({
  imgurl: { type: String, required: false },
  nomb_usuario: { type: String, required: true },
  apell_usuario: { type: String, required: true },
  ced_usuario: { type: String, required: true },
  telf_usuario: { type: String, required: false },
  cel_usuario: { type: String, required: false },
  email_usuario: { type: String, required: true },
  contraseña_usuario: { type: String, required: true },
  conf_contraseña: { type: String, required: true },
  f_creacion_usuario: { type: String, required: false },
  rol_usuario: { type: String, required: true },
});

module.exports = mongoose.model("usuarios", UsersShema);
