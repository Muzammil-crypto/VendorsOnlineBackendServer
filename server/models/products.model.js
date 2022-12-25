const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    shopId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },

    price: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    // },
    images: {
      type: Array,
      required: true,
    },
    assignedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    canceledAt: {
      type: Date,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("products", productSchema);
module.exports = Product;
