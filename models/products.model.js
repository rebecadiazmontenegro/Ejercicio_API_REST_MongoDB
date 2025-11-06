const mongoose = require("mongoose");
const Provider = require("./provider.model");
require("../config/db_mongo"); // Conexión a BBDD MongoDB

const objectSchema = {
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true,
  },
};

// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const Product = mongoose.model("Product", productSchema);

// Crear juego pasando titulo + nombre de compañía por parámetro
async function saveProduct(id, title, price, description, company_name) {
  const provider = await Provider.find({ company_name });
  const provider_id = provider[0]._id.toString();

  const product = new Product({
    id,
    title,
    price,
    description,
    provider: provider_id,
  });

  const result = await product.save();
  console.log(result);
}

module.exports = {
  Product,
  saveProduct,
}; // Exportar el modelo y la función para crear productos

//--------------------------------------------------------------------------

/* saveProduct(
  1,
  "Margaritas",
  1.5,
  "Cafe jugosa del teatro",
  "La casa de las flores"
);

//crear otro pruducto para la casa de las plantas
saveProduct(
  2,
  "Lirios",
  2.5,
  "Cafe jugosa del teatro",
  "La casa de las plantas"
);  

saveProduct(
  3,
  "Malvas",
  2.1,
  "Son moradas y huelen bien",
  "El hogar el gnomo"
); */

// Insertar un producto
/*
const p = new Product({
    id: 8,
    title: "Barrita tomate",
    price: 1.80,
    description: "Cafe jugosa del teatro",
    image:"https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-768x530.png"
});

// Guardar en la BBDD
p.save()
.then((data)=>console.log(data))
.catch(err=>console.log(err))


// Leer todo de la BBDD
Product.find({}).then(data=>console.log(data));
//Product.updateOne({id: 6}, {price: 2.00}).then(data=>console.log(data));
//Product.deleteOne({id: 6}).then(data=>console.log(data));
*/
