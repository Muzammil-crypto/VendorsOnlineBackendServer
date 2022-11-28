const mongoose = require('mongoose');

/**
 * @typedef Category
 * @property {string} _id
 * @property {string} name
 * @property {array} subcategories
 *   @property {string} _id
 *   @property {string} name
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subcategories: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

// export the new Schema so we could modify it using Node.js
Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
