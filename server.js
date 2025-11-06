const express = require("express"); //Esta importando express

const app = express(); //Creando el servidor
const port = 3000; //Puerto de pruebas

//Para leer el fichero
require("dotenv").config();


//Middlewares
const error404 = require("./middlewares/error404");
//Morgan
const morgan = require("./middlewares/morgan")


// Configuración del logger con Morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));


// Habilitar recepción de JSON por mi backend
app.use(express.json());//Esto es un middleware


// Rutas: Habilita el fichero que hemos creado
const productsRoutes = require("./routes/products.routes.js");
const providerRoutes = require("./routes/providers.routes.js");


// http://localhost:3000/
app.get("/", (request, response) => {
  //El primer parametro envia petición y el siguiente respustas
  response.send("Hello World!");
});


// API: Usar las rutas definidas en books.routes.js
app.use('/api/products',productsRoutes);
app.use('/api/entries',providerRoutes);

app.use(error404); // Manejo de rutras no encontradas


//No indica en que puerto y si esta funcionado
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});




