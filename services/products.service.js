const Product = require("../models/products.model");
const Provider = require("../models/provider.model");

// GET http://localhost:3000/api/products
const getProductsService = async (id) => {
  try {
    const filter = id ? { id } : {};
    const products = await Product.find(filter, "-_id -__v").populate("provider", "-_id -__v");
    return { success: true, data: products };
  } catch (error) {
    return { success: false, message: "Error al obtener los productos", details: error.message };
  }
};

// POST http://localhost:3000/api/products
async function createProductService({ id, title, price, description, company_name }) {
  try {
    const provider = await Provider.findOne({ company_name });
    if (!provider) {
      return { success: false, message: `Proveedor '${company_name}' no encontrado` };
    }

    const newProduct = new Product({
      id,
      title,
      price,
      description,
      provider: provider._id,
    });

    const savedProduct = await newProduct.save();
    return { success: true, data: savedProduct };
  } catch (error) {
    return { success: false, message: "Error al crear el producto", details: error.message };
  }
}

// PUT http://localhost:3000/api/products
async function editProductService({ id, title, price, description, company_name }) {
  try {
    const product = await Product.findOne({ id });
    if (!product) return { success: false, message: `No se encontró producto con id ${id}` };

    let provider_id = product.provider;
    if (company_name) {
      const provider = await Provider.findOne({ company_name });
      if (!provider)
        return { success: false, message: `Proveedor '${company_name}' no encontrado` };
      provider_id = provider._id;
    }

    if (title) product.title = title;
    if (price) product.price = price;
    if (description) product.description = description;
    product.provider = provider_id;

    const updated = await product.save();
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, message: "Error al editar el producto", details: error.message };
  }
}

// DELETE http://localhost:3000/api/products
async function deleteProductService(title) {
  try {
    const result = await Product.deleteOne({ title });
    if (result.deletedCount === 0) {
      return { success: false, message: `No se encontró producto con título '${title}'` };
    }
    return { success: true, message: `Producto '${title}' eliminado` };
  } catch (error) {
    return { success: false, message: "Error al eliminar el producto", details: error.message };
  }
}

module.exports = {
  getProductsService,
  createProductService,
  editProductService,
  deleteProductService,
};

