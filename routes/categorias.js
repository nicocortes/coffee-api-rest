const { Router } = require("express");
const { check } = require("express-validator"); //importo para hacer validaciones

const { existeCategoria } = require("../helpers/dbValidators");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-rol");

const {
	crearCategorias,
	obtenerCategorias,
	obtenerCategoria,
	actualizarCategoria,
	borrarCategoria,
} = require("../controllers/categorias");

const router = Router();

//Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

//Obtener la categoria por id - publico
router.get(
	"/:id",
	[
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existeCategoria),
		validarCampos,
	],
	obtenerCategoria
);

//crear categoria privado
router.post(
	"/",
	[
		validarJWT,
		esAdminRole,
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		validarCampos,
	],
	crearCategorias
);

//actualizar registro por id privado
router.put(
	"/:id",
	[
		validarJWT,
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existeCategoria),
		validarCampos,
	],
	actualizarCategoria
);

//borrar categoria privado - admin
router.delete(
	"/:id",
	[
		validarJWT,
		esAdminRole,
		check("id", "No es un ID válido").isMongoId(),
		check("id").custom(existeCategoria),
		validarCampos,
	],
	borrarCategoria
);

module.exports = router;
