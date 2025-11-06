const {Product,saveProduct} = require('../models/products.model');

// CREATE
const createProduct = async (req, res) => {
  console.log(req.body);

  try {
    const { id, title, price, description, image, companyName } = req.body;
    if (!title || !price || !description || !companyName) {
      res.status(400).json({ msj: "Faltan datos obligatorios" });
      return;
    }
    let answer = await saveProduct(
      id,
      title,
      price,
      description,
      companyName
    );
    res.status(201).json("Producto creado!");
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ msj: `ERROR: ${error.stack}` });
  }
};

// READ
const getProduct = async (req, res) => {
        try {
            const id = req.params.id;
            let products = id? await Product.find({id},'-_id -__v').populate('provider','-_id -__v') 
                            : await Product.find({},'-_id -__v').populate('provider','-_id -__v'); //Si no le pasas id te devuelve
            res.status(200).json(products); // Respuesta de la API para 1 producto
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({msj:`ERROR: ${error.stack}`});
        }
}

// UPATE
const editProduct = (req, res) => {
    res.status(200).send("Producto editado!");
}

// DELETE
const deleteProduct = (req, res) => {
    res.status(200).send("Producto borrado!. Has borrado:"+req.params.id);
}

module.exports = {
    createProduct,
    getProduct,
    editProduct,
    deleteProduct
}