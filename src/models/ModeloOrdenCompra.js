const mongoose = require('mongoose');
const { Schema } = mongoose;
/*EJEMPLO*/
const OrdenCompra = new Schema({
	idUserSession: { type: String, required: true },
	ced_usuario: { type: String, required: true },
	email_usuario: { type: String, required: true },
	nomb_usuario: { type: String, required: true },
	apell_usuario: { type: String, required: true },
	direcc_usuario: { type: String, required: true },
	apart_usuario: { type: String, required: false },
	codPost_usuario: { type: String, required: true },
	ciudad_usuario: { type: String, required: true },
	pais_usuario: { type: String, required: true },
	cel_usuario: { type: String, required: true },
	carrito_usuario: { type: Array, require: true },
	f_creacion_ordenCompra: { type: String, required: false },
});

module.exports = mongoose.model('ordenCompra', OrdenCompra);
