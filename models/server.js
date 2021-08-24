const express = require("express");
const cors = require("cors");

class Server {
	constructor() {
		//Inicialicen cuando se levante el server
		this.app = express(); //Asigno a app todas las funcionalidades de Express
		this.usuariosPath = "/api/usuarios";

		//Middlewares
		this.middlewares();

		//Rutas
		this.routes();
	}

	middlewares() {
		//Carpeta pública
		this.app.use(express.static("public"));

		//CORS
		this.app.use(cors());
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
