const express = require('express');
const usuarios = express.Router();
const modelo = require('../models/ModeloUsuarios'); //obtener modelo
const modeloProducto = require('../models/ModeloProductoCar'); //obtener modelo

//Obtener datos
usuarios.get('/', async (req, res) => {
	const documentos = await modelo.find();
	//console.log(documentos);
	res.json(documentos);
});

usuarios.get('/:id', async (req, res) => {
	const documentos = await modelo.findById(req.params.id);
	//console.log(documentos);
	res.json(documentos);
});

// Enviar datos
usuarios.post('/', async (req, res) => {
	const f_creacion_usuario = new Date().toLocaleString('es-EC');
	const {
		nomb_usuario,
		apell_usuario,
		ced_usuario,
		telf_usuario,
		cel_usuario,
		email_usuario,
		contraseña_usuario,
		conf_contraseña,
		rol_usuario,
	} = req.body;
	const documento = new modelo({
		nomb_usuario,
		apell_usuario,
		ced_usuario,
		telf_usuario,
		cel_usuario,
		email_usuario,
		contraseña_usuario,
		conf_contraseña,
		f_creacion_usuario,
		rol_usuario,
	});
	await documento.save();

	res.json({ status: 'Guardado' });
});

// Actualizar datos
usuarios.put('/:id', async (req, res) => {
	const f_creacion_usuario = new Date().toLocaleString('es-EC');
	const {
		nomb_usuario,
		apell_usuario,
		ced_usuario,
		telf_usuario,
		cel_usuario,
		email_usuario,
		contraseña_usuario,
		conf_contraseña,
		rol_usuario,
	} = req.body;
	const newdocumento = {
		nomb_usuario,
		apell_usuario,
		ced_usuario,
		telf_usuario,
		cel_usuario,
		email_usuario,
		contraseña_usuario,
		conf_contraseña,
		f_creacion_usuario,
		rol_usuario,
	};
	await modelo.findByIdAndUpdate(req.params.id, newdocumento);

	res.json({ status: 'Actualizado' });
});

// Carrito de compras del usuario
usuarios.get('/:id/carrito-compra', async (req, res) => {
	const documentos = await modeloProducto.find();
	// await modeloProducto.deleteMany({ categoria_producto: 'Filtros' });
	//console.log(documentos);
	res.json(documentos);
});

usuarios.post('/:id/carrito-compra', async (req, res) => {
	try {
		console.log('post: ', req.body);

		const {
			imgurl,
			_id,
			codigo_producto,
			nom_producto,
			descrip_producto,
			categoria_producto,
			precio_producto,
			cantidad_producto,
			f_registro_producto,
			modelo_producto,
			idUserSession,
		} = req.body;
		const documento = new modeloProducto({
			imgurl,
			idProd: _id,
			codigo_producto,
			nom_producto,
			descrip_producto,
			categoria_producto,
			precio_producto,
			cantidad_producto,
			f_registro_producto,
			modelo_producto,
			idUserSession,
		});
		console.log('post: ', documento);
		await documento.save();

		res.json({ status: 'Guardado' });
	} catch (error) {
		res.json({ status: 'Error' });
		console.log(error);
	}
});

// Actualizar datos
usuarios.put('/:id/carrito-compra', async (req, res) => {
	console.log('put: ', req.body);
	const {
		imgurl,
		idProd,
		codigo_producto,
		nom_producto,
		descrip_producto,
		categoria_producto,
		precio_producto,
		cantidad_producto,
		f_registro_producto,
		modelo_producto,
		idUserSession,
	} = req.body;
	const newdocumento = {
		imgurl,
		idProd,
		codigo_producto,
		nom_producto,
		descrip_producto,
		categoria_producto,
		precio_producto,
		cantidad_producto,
		f_registro_producto,
		modelo_producto,
		idUserSession,
	};
	console.log('put: ', newdocumento);
	await modeloProducto.findByIdAndUpdate(req.body._id, newdocumento);

	res.json({ status: 'Actualizado' });
});

// Eliminar datos
usuarios.delete('/:id/carrito-compra', async (req, res) => {
	await modeloProducto.findByIdAndRemove(req.body.idProductoUnique);
	res.json({ status: 'Eliminado' });
});

module.exports = usuarios;
