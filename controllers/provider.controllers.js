const { Provider, saveProvider } = require("../models/provider.model");

// GET http://localhost:3000/api/providers
const getProvider = async (req, res) => {
  try {
    const id = req.params.id;

    let providers = id
      ? await Provider.findById(id, "-_id -__v")
      : await Provider.find({}, "-_id -__v");

    res.status(200).json(providers);
  } catch (error) {
    console.error(`ERROR: ${error.stack}`);
    res.status(400).json({ msj: `ERROR: ${error.message}` });
  }
};

module.exports = { getProvider };

// POST http://localhost:3000/api/providers

const createProvider = async (req, res) => {
  console.log(req.body);

  try {
    const { company_name, cif, adress, url_web } = req.body;
    if (!company_name || !cif || !adress || !url_web) {
      res.status(400).json({ msj: "Faltan datos obligatorios" });
      return;
    }
    let answer = await saveProvider(company_name, cif, adress, url_web);
    res.status(201).json(`Proveedor ${company_name} creado`);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ msj: `ERROR: ${error.stack}` });
  }
};

// PUT http://localhost:3000/api/providers

const editProvider = async (req, res) => {
  try {
    const { company_name, cif, adress, url_web } = req.body;

    if (!cif) {
      return res.status(400).json({
        message: "Debes indicar el CIF del proveedor para poder editarlo.",
      });
    }

    const provider = await Provider.findOne({ cif });
    if (!provider) {
      return res
        .status(404)
        .json({ message: `No se encontró ningún proveedor con el CIF ${cif}` });
    }

    if (company_name) provider.company_name = company_name;
    if (adress) provider.adress = adress;
    if (url_web) provider.url_web = url_web;

    await provider.save();

    res.status(200).json({
      message: `Proveedor actualizado correctamente.`,
      data: provider,
    });
  } catch (error) {
    console.error("Error al actualizar el proveedor:", error);
    res.status(500).json({
      message: "Error del servidor.",
      error: error.message,
    });
  }
};


// DELETE http://localhost:3000/api/providers?title=title

const deleteProvider = async (req, res) => {
  const cif = req.body.cif; 
 
  // Validar que el título esté presente
  if (!cif) {
    return res.status(400).json({
      message: "Debe especificarse el CIF del proveedor a eliminar.",
    });
  }

  try {
    // Eliminar el producto que coincida con ese título
    const result = await Provider.deleteOne({ cif });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: `No se encontró ningún producto con el CIF '${cif}'.`,
      });
    }

    res.status(200).json({
      message: `Se ha borrado el proveedor'${cif}'.`,
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
  createProvider,
  getProvider,
  editProvider,
  deleteProvider
};
