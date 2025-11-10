const mongoose = require("mongoose");
require("../config/db_mongo"); // Conexión a BBDD MongoDB

const objectSchema = {
  company_name: {
    type: String,
    required: true,
    unique: true,
  },
  cif: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        if (/^[A-Za-z0-9]{0,9}$/.test(value)) {
          return true;
        } else {
          return false;
        }
      },
      message: "Solo se permiten letras o números y no más de 9 caracteres",
    },
  },
  adress: {
    type: String,
    required: true,
  },
  url_web: {
    type: String,
    required: true,
    validate: {
      validator: function (url) {
        if (url.indexOf("http") != -1) return true;
        else {
          return false;
        }
      },
      message: "Porfa, introduce una URL válida",
    },
  },
};

// Crear el esquema
const providerSchema = mongoose.Schema(objectSchema);

// Crear el modelo
const Provider = mongoose.model("Provider", providerSchema);

module.exports = Provider;

// ---------------------------------------------------------------------------------------------

//Ejemplos de uso
/*
saveProvider(
  "Eco plantas",
  "A12748678",
  "Calle del Sol 23, Madrid",
  "http://www.ecoplantas.es"
);
*/

/* // Insertar un proveedor
const p = new Provider({
    company_name: "La casa de las flores",
    cif: "B34567891",
    adress: "Calle Laguna",
    url_web: "https://www.lacasadelasflores.com"
});

// Guardar en la BBDD
p.save()
.then((data)=>console.log(data))
.catch(err=>console.log(err))

// Insertar otro proveedor
const p2 = new Provider({
    company_name: "La casa de las plantas",
    cif: "A12345678",
    adress: "Calle Margarita",
    url_web: "https://www.lacasadelasplantas.com"
    
});

// Guardar en la BBDD
p2.save()
.then((data)=>console.log(data))  */

/* // Insertar otro proveedor
const p3 = new Provider({
    company_name: "El hogar el gnomo",
    cif: "C98765432",
    adress: "Calle Napolitana",
    url_web: "https://www.elhogardelgnomo.com"
    
});

// Guardar en la BBDD
p3.save()
.then((data)=>console.log(data))  */
