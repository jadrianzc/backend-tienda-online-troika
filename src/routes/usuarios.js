const express = require('express');
const usuarios = express.Router();
const modelo = require('../models/ModeloUsuarios'); //obtener modelo
const modeloProducto = require('../models/ModeloProductoCar'); //obtener modelo
const modeloOrdenCompra = require('../models/ModeloOrdenCompra');
const nodemailer = require('nodemailer');

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
	const imgurl = 'https://res.cloudinary.com/troikafoto/image/upload/v1629124545/User/5-08_p4m8t8.jpg';
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
		imgurl,
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

// Eliminar datos
usuarios.delete('/:id', async (req, res) => {
	await modelo.findByIdAndRemove(req.params.id);

	res.json({ status: 'Eliminado' });
});

// Orden de compra del usuario
usuarios.get('/:id/orden-compra', async (req, res) => {
	const documentos = await modeloOrdenCompra.find();
	res.json(documentos);
});

// Guarda las ordenes de compras y envía correo
usuarios.post('/:id/orden-compra', async (req, res) => {
	try {
		let total = 0;
		const f_creacion_ordenCompra = new Date().toLocaleString('es-EC');
		const {
			idUserSession,
			ced_usuario,
			email_usuario,
			nomb_usuario,
			apell_usuario,
			direcc_usuario,
			apart_usuario,
			codPost_usuario,
			ciudad_usuario,
			pais_usuario,
			cel_usuario,
			carrito_usuario,
		} = req.body;
		const documento = new modeloOrdenCompra({
			idUserSession,
			ced_usuario,
			email_usuario,
			nomb_usuario,
			apell_usuario,
			direcc_usuario,
			apart_usuario,
			codPost_usuario,
			ciudad_usuario,
			pais_usuario,
			cel_usuario,
			carrito_usuario,
			f_creacion_ordenCompra,
		});

		await documento.save();

		// Envío de correo
		const contenmtHTML = `
            <h1 style="color: #000">Solicitud pago de orden de compra</h1>
            <img src="https://res.cloudinary.com/troikafoto/image/upload/v1629437870/Productos/logo3_au24nl.png" alt="Logo Troika" style="width: 350px; height: 88px" />
            <p style="color: #000">TROIKA CÍA LTDA. Ha recibido una orden de compra a pagar.</p>
            <hr>
			<p>Para realizar la compra deberá realizar el pago correspondiente, ya sea mediante transferencia o depósito.</p>
			<p><strong>Deberá adjuntar el comprobante de pago.</strong></p>
            <hr>
			<h3>DATOS DE LA CUENTA:</h3>
			<p><strong>Banco: </strong>Machala</p>
			<p><strong>Beneficiario: </strong>Troika Cía Ltda</p>
			<p><strong>Ruc: </strong>0992854294001</p>
			<p><strong>Número de cuenta: </strong>22004488976</p>
			<p><strong>Tipo de cuenta: </strong>Corriente</p>
			<hr>
			<h3>DETALLE DE LA ORDEN DE COMPRA:</h3>

			<table style="width:50%; border: 1px solid black; border-collapse: collapse;">
				<tbody>
					<tr>
						<th style="border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: center">Descripción</th>
						<th style="border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: center">Cantidad</th>
						<th style="border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: center">Precio</th>
					</tr>
					${carrito_usuario.map(
						(data) =>
							`<tr>
								<td style="border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: center">${data.descrip_producto}</td>
								<td style="border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: center">${data.cantidad_producto}</td>
								<td style="border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: center">${data.precio_producto}</td>
							</tr>`
					)}
				</tbody>
			</table>

			<h3>Total a pagar:${carrito_usuario.map((data) => {
				const op = parseFloat(data.cantidad_producto * data.precio_producto);
				total = total + op;
			})} ${total}</h3>
        `;

		const smtpTransport = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'grupotroika.tiendaonline@gmail.com',
				pass: 'troika123',
			},
		});

		const info = await smtpTransport.sendMail({
			from: 'TROIKA CÍA LTDA <grupotroika.tiendaonline@gmail.com>',
			to: email_usuario,
			subject: 'Solicitud pago de orden de compra',
			html: contenmtHTML,
		});

		console.log('Mensaje Enviado', info.messageId);

		res.json({ status: 'Guardado' });
	} catch (error) {
		res.json({ status: 'Error' });
		console.log(error);
	}
});

module.exports = usuarios;
