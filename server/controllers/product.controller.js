const uploadFiles = require("../utils/uploadFiles");
const Product = require("../models/products.model");
const { all } = require("../routes");
class productController {
  static async getAllProduct(req, res) {
    try {
      const allProducts = Product.find();
      const prod = await allProducts.exec();
      return res.status(200).json({
        data: prod,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async createProduct(req, res) {
    try {
      console.log(req.body);
      const images = req?.files?.images;

      const imagePaths = uploadFiles(images, `products/${req.user._id}`);
      req.body.images = imagePaths;

      req.body.createdBy = req.user._id;
      const productData = await Product.create(req.body);

      return res.status(201).json({
        message: "Product created!",
        data: productData.toJSON(),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  static async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id)
        .populate("createdBy")
        .populate("assignedTo")
        .populate("reviews");

      const createdByReviews = await Review.find({
        reviewedTo: product.createdBy,
      });

      return res.status(200).json({
        data: productsWithReviews,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = productController;
