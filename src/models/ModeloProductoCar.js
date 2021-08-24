const mongoose = require('mongoose');
const { Schema } = mongoose;
/*EJEMPLO*/
const ProductosCarShema = new Schema({
	imgurl: { type: String, required: true },
	idProd: { type: String, required: true },
	codigo_producto: { type: String, required: true },
	nom_producto: { type: String, required: true },
	descrip_producto: { type: String, required: true },
	categoria_producto: { type: String, required: true },
	precio_producto: { type: Number, required: true },
	cantidad_producto: { type: Number, required: true },
	f_registro_producto: { type: String, required: false },
	modelo_producto: { type: String, required: true },
	idUserSession: { type: String, required: true },
	estado: { type: Boolean, required: true },
});

module.exports = mongoose.model('productosCar', ProductosCarShema);
