// const express = require("express");
require("dotenv").config();

const Server = require("./models/server");

const server = new Server();

server.listen();
//const app = express(); Asigno a app todas las funcionalidades de Express

//Ruta
// app.get("/", function (req, res) {
// 	res.send("Hola Rolling Coders!!!");
// });

// app.listen(process.env.PORT, () => {
// 	console.log("Server on port", process.env.PORT);
// });
