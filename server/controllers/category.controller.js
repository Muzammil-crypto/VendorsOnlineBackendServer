const Category = require('../models/category.model');

class CategoryController {
  static async getAllCategories(req, res) {
    try {
      const categories = await Category.find();

      return res.status(200).json({
        data: categories,
      });
    } catch (err) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}

module.exports = CategoryController;
