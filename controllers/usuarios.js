const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
	let { limite = 10, desde = 0 } = req.query;
	limite = Number(limite);
	desde = Number(desde);

	const usuarios = await Usuario.find({ estado: true })
		.limit(limite)
		.skip(desde);
	const total = await Usuario.countDocuments({ estado: true });
	res.json({
		Total: total,
		usuarios,
	});
};

const usuariosPost = async (req = request, res = response) => {
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
	const { id } = req.params;
	// const usuario = await Usuario.findByIdAndDelete(id); Para borrar definitivamente
	const usuario = await Usuario.findByIdAndUpdate(
		id,
		{ estado: false },
		{ new: true }
	);

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
