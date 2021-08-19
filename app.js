const express = require("express");
const app = express(); //Asigno a app todas las funcionalidades de Express

const port = 8080;
//Ruta
app.get("/", function (req, res) {
	res.send("Hola Rolling Coders");
});

app.listen(port, () => {
	console.log(`Server on port ${port}`);
});
