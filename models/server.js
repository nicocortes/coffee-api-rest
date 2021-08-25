const express = require("express");
const cors = require("cors");

//Importar conexion a BD
const { dbConection } = require("../database/config");

class Server {
	constructor() {
		//Inicialicen cuando se levante el server
		this.app = express(); //Asigno a app todas las funcionalidades de Express
		this.usuariosPath = "/api/usuarios";

		//Conexion DB
		this.conectarDB();

		//Middlewares
		this.middlewares();

		//Rutas
		this.routes();
	}

	//Funcion para conectar a base de datos
	async conectarDB() {
		await dbConection();
	}

	middlewares() {
		//Carpeta pública
		this.app.use(express.static("public"));

		//CORS
		this.app.use(cors());

		//Acceso al body - Leer y parsear
		this.app.use(express.json());
	}

	routes() {
		this.app.use(this.usuariosPath, require("../routes/usuarios"));
	}

	listen() {
		this.app.listen(process.env.PORT, () => {
			console.log("Server on port", process.env.PORT);
		});
	}
}

module.exports = Server;
