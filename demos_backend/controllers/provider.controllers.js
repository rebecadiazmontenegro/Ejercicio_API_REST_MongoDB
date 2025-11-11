const {
  getProviderService,
  createProviderService,
  editProviderService,
  deleteProviderService,
} = require("../services/providers.service");

// GET http://localhost:3000/api/providers
const getProvider = async (req, res) => {
  try {
    const cif = req.params.cif;
    const providers = await getProviderService(cif);
    res.status(200).json(providers);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msj: error.message });
  }
};

// POST http://localhost:3000/api/providers

const createProvider = async (req, res) => {
  try {
    const { company_name, cif, adress, url_web } = req.body;

    if (!company_name || !cif || !adress || !url_web) {
      return res.status(400).json({ msj: "Faltan datos obligatorios" });
    }

    const result = await createProviderService({
      company_name,
      cif,
      adress,
      url_web,
    });

    if (result.exists) {
      return res.status(400).json({ msj: result.message });
    }

    return res.status(201).json({
      message: "Proveedor creado.",
      provider: result.provider,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msj: error.message });
  }
};

// // PUT http://localhost:3000/api/providers

const editProvider = async (req, res) => {
  try {
    const updatedProvider = await editProviderService(req.body);

    res.status(200).json({
      message: `Proveedor actualizado: ${updatedProvider.company_name}.`,
      provider: updatedProvider,
    });
  } catch (error) {
    console.error("Error al actualizar el proveedor:", error);
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE http://localhost:3000/api/providers

const deleteProvider = async (req, res) => {
  try {
    const { company_name } = req.body;
    if (!company_name)
      return res
        .status(400)
        .json({ message: "Debe especificar el nombre del proveedor." });
    await deleteProviderService(company_name);
    res
      .status(200)
      .json({ message: `Se ha borrado el proveedor: '${company_name}'.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProvider,
  createProvider,
  editProvider,
  deleteProvider,
};
