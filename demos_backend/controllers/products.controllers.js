const {
  getProductsService,
  createProductService,
  editProductService,
  deleteProductService,
} = require("../services/products.service");

// GET http://localhost:3000/api/products

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await getProductsService(id);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msj: error.message });
  }
};

// // POST http://localhost:3000/api/products

const createProduct = async (req, res) => {
  const { id, title, price, description, company_name } = req.body;
  if (!title || !price || !description || !company_name) {
    return res.status(400).json({ msj: "Faltan datos obligatorios" });
  }

  const result = await createProductService({ id, title, price, description, company_name });

  if (result.error) {
    // Devuelve 400 si hubo error
    return res.status(400).json({ msj: result.message });
  }

  // Solo entra aquí si se creó correctamente
  res.status(201).json({
    message: `Producto '${result.product.title}' creado`,
    product: result.product,
  });
};


// PUT http://localhost:3000/api/products

const editProduct = async (req, res) => {
  try {
    const updated = await editProductService(req.body);
    res
      .status(200)
      .json({
        message: `Producto actualizado: ${updated.title}`,
        data: updated,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE http://localhost:3000/api/products

const deleteProduct = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title)
      return res.status(400).json({ message: "Debe especificar el título." });
    await deleteProductService(title);
    res.status(200).json({ message: `Producto '${title}' eliminado.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
};