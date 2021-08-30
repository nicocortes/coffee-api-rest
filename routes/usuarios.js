const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosDelete,
} = require("../controllers/usuarios");

//Controladores
const { validarCampos } = require("../middlewares/validarCampos");
const { emailExiste, idExiste } = require("../helpers/dbValidators");

router.get("/", usuariosGet);

router.post(
	"/",
	[
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("password", "Debe tener una contraseña").not().isEmpty().trim(),
		check(
			"password",
			"La contraseña debe tener 5 caracteres como mínimo"
		).isLength({ min: 6 }),
		check("email", "No es un correo válido. ").isEmail(),
		check("email").custom(emailExiste),
		check("rol", "No es un rol válido").isIn(["USER_ROLE", "ADMIN_ROLE"]),
		validarCampos,
	],
	usuariosPost
);

router.put(
	"/:id",
	[
		check("id", "No es un Id válido").isMongoId(),
		[check("id").custom(idExiste)],
		validarCampos,
	],

	usuariosPut
);

router.delete("/:id", usuariosDelete);

module.exports = router;
