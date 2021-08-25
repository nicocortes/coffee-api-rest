const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const usuariosGet = (req = request, res = response) => {
	res.json({
		msg: "GET usuarios",
	});
};

const usuariosPost = async (req = request, res = response) => {
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({ errors: errores.array() });
	}

	const { nombre, email, password, rol } = req.body;
	const usuario = new Usuario({ nombre, email, password, rol });

	//Encriptacion de contraseña
	const salt = bcrypt.genSaltSync();
	usuario.password = bcrypt.hashSync(password, salt);

	await usuario.save();

	res.send({
		msg: "Usuario creado",
		usuario,
	});
};

const usuariosPut = async (req = request, res = response) => {
	const id = req.params.id;
	const { _id, email, rol, password, ...resto } = req.body;

	if (password) {
		const salt = bcrypt.genSaltSync();
		resto.password = bcrypt.hashSync(password, salt);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

	res.send({
		msg: "PUT usuarios",
		usuario,
	});
};

const usuariosDelete = async (req = request, res = response) => {
	const id = req.params.id;
	// const usuario = await Usuario.findByIdAndDelete(id); Para borrar definitivamente
	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

	res.send({
		msg: "Delete usuarios",
		usuario,
	});
};

module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosDelete,
};
