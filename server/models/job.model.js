const mongoose = require("mongoose");

/**
 * @typedef Job
 * @property {string} _id
 * @property {string} title
 * @property {string} description
 * @property {string} company
 * @property {object} location
 *  @property {number} lat
 *  @property {number} lng
 *  @property {string} address
 * @property {string} budget
 * @property {string} status
 * @property {ObjectId} createdBy
 * @property {ObjectId} assignedTo
 * @property {ObjectId} category
 * @property {array} images
 * @property {Date} createdAt
 * @property {Date} assignedAt
 * @property {Date} completedAt
 * @property {Date} canceledAt
 * @property {Date} deletedAt
 * @property {Date} updatedAt
 * @property {boolean} isActive
 * @property {boolean} isAssigned
 * @property {boolean} isCompleted
 * @property {boolean} isCanceled
 * @property {boolean} isDeleted
 */

const JobSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
      // minlength: 100,
    },
    company: {
      type: String,
    },
    location: {
      lat: {
        type: Number,
        // required: true,
      },
      lng: {
        type: Number,
        // required: true,
      },
      address: {
        type: String,
        // required: true,
      },
    },
    budget: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      // required: true,
      enum: [
        "active",
        "inactive",
        "assigned",
        "completed",
        "cancelled",
        "closed",
        "deleted",
      ],
      default: "active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
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
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// get job images with base url
JobSchema.methods.toJSON = function () {
  const job = this;
  const jobObject = job.toObject();

  jobObject.images = job.images.map((image) => {
    return process.env.BASE_URL + image;
  });

  if (jobObject.createdBy?.profileImage)
    jobObject.createdBy.profileImage =
      process.env.BASE_URL + jobObject.createdBy.profileImage;

  if (jobObject.assignedTo?.profileImage) {
    jobObject.assignedTo.profileImage =
      process.env.BASE_URL + jobObject.assignedTo.profileImage;
  }

  return jobObject;
};

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
