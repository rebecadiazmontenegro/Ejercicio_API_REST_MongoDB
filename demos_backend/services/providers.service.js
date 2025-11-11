const Product = require("../models/products.model");
const Provider = require("../models/provider.model");

// GET http://localhost:3000/api/products

const getProviderService = async (cif) => {
  try {
    const filter = cif ? { cif } : {}; // Si tiene id devulve el del id sino devuelve todos
    const providers = await Provider.find(filter, "-_id -__v");
    return providers;
  } catch (error) {
    return {
      message: "Error al obtener los proovedores",
      details: error.message,
    };
  }
};

// POST http://localhost:3000/api/products

async function createProviderService({ company_name, cif, adress, url_web }) {
  try {
    const existingProvider = await Provider.findOne({ company_name });

    if (existingProvider) {
      return {
        exists: true,
        message: `El proveedor '${company_name}' ya existe`,
      };
    }

    const newProvider = new Provider({ 
      company_name, 
      cif, 
      adress, 
      url_web 
    });
    const savedProvider = await newProvider.save();

    return { exists: false, provider: savedProvider };
  } catch (error) {
    return {
      exists: false,
      message: "Error al crear el proveedor",
      details: error.message,
    };
  }
}

// PUT http://localhost:3000/api/providers

async function editProviderService({ company_name, cif, adress, url_web }) {
  try {
    if (!cif) {
      return {
        message: "Debes indicar el CIF del proveedor para poder editarlo.",
      };
    }

    const provider = await Provider.findOne({ cif });
    if (!provider) {
      return {
        message: `No se encontró ningún proveedor con el CIF ${cif}`,
      };
    }

    if (company_name) provider.company_name = company_name;
    if (adress) provider.adress = adress;
    if (url_web) provider.url_web = url_web;

    const updatedProvider = await provider.save();
    return updatedProvider;
  } catch (error) {
    return {
      message: "Error al editar el proveedor",
      details: error.message,
    };
  }
}

// DELETE http://localhost:3000/api/providers

async function deleteProviderService(company_name) {
  try {
    const result = await Product.deleteOne({ company_name });
    if (result.deletedCount === 0) {
      return {
        message: `No se encontró proveedor con el nombre '${company_name}'`,
      };
    }
    return {
      message: `Se ha borrado el proveedor: '${company_name}'`,
    };
  } catch (error) {
    return {
      message: "Error al eliminar el producto",
      details: error.message,
    };
  }
}

module.exports = {
  getProviderService,
  createProviderService,
  editProviderService,
  deleteProviderService,
};
