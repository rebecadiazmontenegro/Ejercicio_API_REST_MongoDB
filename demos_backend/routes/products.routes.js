const productsController = require('../controllers/products.controllers');
const router = require('express').Router();

// GET http://localhost:3000/api/products
// GET http://localhost:3000/api/products/id

router.get("{/:id}", productsController.getProduct);

// POST http://localhost:3000/api/products
/*
A enviar por body como ejemplo:
{
    "id": 15,
    "title": "Girasoles",
    "price": 3,
    "description": "Gira cuando hay sol",
    "company_name": "Las plantas de Flor"
}
*/

router.post("/", productsController.createProduct);

//PUT http://localhost:3000/api/products

router.put("/", productsController.editProduct);

//DELETE http://localhost:3000/api/products

router.delete("/", productsController.deleteProduct);


module.exports = router;