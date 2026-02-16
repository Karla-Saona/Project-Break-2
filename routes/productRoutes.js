/*
CRUD
Maneja productos:
Ver todos, ver uno, crear, actualizar, eliminar
*/

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.showProducts);
router.get("/:id", productController.showProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

// PUT y DELETE (HTML)
router.get("/:id/edit", productController.showEditForm);
router.post("/:id/edit", productController.updateProductFromForm);

router.post("/:id/delete", productController.deleteProductFromForm);


module.exports = router;
