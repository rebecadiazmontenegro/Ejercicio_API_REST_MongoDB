const providerController = require("../controllers/provider.controllers");
const router = require("express").Router();

// GET http://localhost:3000/api/provider
// GET http://localhost:3000/api/provider/id

router.get("{/:cif}", providerController.getProvider);

// POST http://localhost:3000/api/products
/*
A enviar por body como ejemplo:
{
    "company_name": "Plantitas",
    "cif": "R34567591",
    "adress": "Calle Balenciaga",
    "url_web": "https://www.plantitas.com"
}
*/

router.post("/", providerController.createProvider);

// //PUT http://localhost:3000/api/products
/*
A enviar por body como ejemplo:
{
    "company_name": "Plantitas Anita",
    "cif": "R34567591",
    "adress": "Calle Balenciaga",
    "url_web": "https://www.plantitas.com"
}
*/

router.put("/", providerController.editProvider);

// //DELETE http://localhost:3000/api/products

router.delete("/", providerController.deleteProvider);

module.exports = router;
