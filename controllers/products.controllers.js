const { Product, saveProduct } = require("../models/products.model");

// GET http://localhost:3000/api/products
const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let products = id
      ? await Product.find({ id }, "-_id -__v").populate(
          "provider",
          "-_id -__v"
        )
      : await Product.find({}, "-_id -__v").populate("provider", "-_id -__v"); //Si no le pasas id te devuelve
    res.status(200).json(products); // Respuesta de la API para 1 producto
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ msj: `ERROR: ${error.stack}` });
  }
};

// POST http://localhost:3000/api/products

const createProduct = async (req, res) => {
  console.log(req.body);

  try {
    const { id, title, price, description, company_name } = req.body;
    if (!title || !price || !description || !company_name) {
      res.status(400).json({ msj: "Faltan datos obligatorios" });
      return;
    }
    let answer = await saveProduct(id, title, price, description, company_name);
    res.status(201).json(`El producto ${title} ha sido creado`);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ msj: `ERROR: ${error.stack}` });
  }
};

// PUT http://localhost:3000/api/products

const editProduct = async (req, res) => {
  try {
    const { id, title, price, description, company_name } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({
          message: "Debes indicar el ID del producto para poder editarlo.",
        });
    }
    const product = await Product.findOne({ id });
    if (!product) {
      return res
        .status(404)
        .json({ message: `No se encontró ningún producto con id ${id}` });
    }

    // Por si se cambia a un nuevo proveedor 
    let provider_id = product.provider; // Mete en una variable el proveedor actual
    if (company_name) {
      const provider = await Provider.findOne({ company_name });
      if (!provider) {
        return res
          .status(404)
          .json({ message: `No se encontró el proveedor '${company_name}'` });
      }
      provider_id = provider._id;
    }

    if (title) product.title = title;
    if (price) product.price = price;
    if (description) product.description = description;
    product.provider = provider_id;

    await product.save();

    res.status(200).json({
      message: `Producto actualizado: ${title}`,
      data: product,
    });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res
      .status(500)
      .json({ message: "Error del servidor.", error: error.message });
  }
};

// DELETE http://localhost:3000/api/products

const deleteProduct = async (req, res) => {
  const title = req.body.title; // Se obtiene el título desde el body
 
  // Validar que el título esté presente
  if (!title) {
    return res.status(400).json({
      message: "Debe especificarse el título del producto a eliminar.",
    });
  }

  try {
    // Eliminar el producto que coincida con ese título
    const result = await Product.deleteOne({ title });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: `No se encontró ningún producto con el título '${title}'.`,
      });
    }

    res.status(200).json({
      message: `Se ha borrado el producto '${title}'.`,
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({
      message: "Error interno del servidor.",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProduct,
  editProduct,
  deleteProduct,
};
