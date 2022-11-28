const mongoose = require('mongoose');

/**
 * @typedef Review
 * @property {string} _id
 * @property {ObjectId} reviewedBy
 * @property {ObjectId} reviewedTo
 * @property {ObjectId} reviewAt
 * @property {number} rating
 * @property {string} comment
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const Schema = mongoose.Schema;
const ReviewSchema = new Schema(
  {
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewOf: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
