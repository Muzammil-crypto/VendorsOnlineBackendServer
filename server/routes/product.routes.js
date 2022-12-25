const express = require("express");
const productController = require("../controllers/product.controller");
const ProductValidation = require("../validations/product.validation");
const validateRequest = require("../middlewares/validateRequest");

const router = express.Router();

router.get("/:id", validateRequest(ProductValidation.getProductById()));
router.get(
  "/",
  validateRequest(ProductValidation.getAllProducts()),
  productController.getAllProduct
);
router.post(
  "/",

  productController.createProduct
);

module.exports = router;
