const Job = require("../models/job.model");
const Review = require("../models/review.model");
const uploadFiles = require("../utils/uploadFiles");

const Status = {
  Active: "active",
  Inactive: "inactive",
  Assigned: "assigned",
  Completed: "completed",
  Canceled: "cancelled",
  Closed: "closed",
  Deleted: "deleted",
};

class JobController {
  static async getAllJobs(req, res) {
    try {
      const { page, limit, status, search, createdBy } = req.query;

      const jobsQuery = Job.find({
        status: status ? { $in: status.split(",") } : { $ne: "deleted" },
      })
        .populate("category")
        .populate("createdBy")
        .populate("assignedTo")
        .sort({ createdAt: -1 });

      if (page && limit) {
        jobsQuery.skip(parseInt(page) * parseInt(limit)).limit(parseInt(limit));
      }

      if (search) {
        jobsQuery.find({
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
          ],
        });
      }

      if (createdBy) {
        jobsQuery.find({
          createdBy,
        });
      }

      const jobs = await jobsQuery.exec();

      // get all reviews of createdBy and put them in an array in createdBy
      const jobsWithReviews = [];
      for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];

        const createdByReviews = await Review.find({
          reviewedTo: job?.createdBy?._id,
        });

        jobsWithReviews.push({
          ...job.toJSON(),
          createdBy: {
            ...job?.createdBy?.toJSON(),
            reviews: createdByReviews,
          },
        });
      }

      return res.status(200).json({
        data: jobsWithReviews,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  static async findJobByType(req, res) {
    try {
      const job = await Job.find({ type: req.params.type })
        .populate("category")
        .populate("createdBy")
        .populate("assignedTo")
        .populate("reviews");
      console.log({ job, type: req.params.type });

      return res.status(200).json({
        data: job,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  static async getJobById(req, res) {
    try {
      const job = await Job.findById(req.params.id)
        .populate("category")
        .populate("createdBy")
        .populate("assignedTo")
        .populate("reviews");

      // get all reviews of createdBy and put them in an array in createdBy
      const createdByReviews = await Review.find({
        reviewedTo: job.createdBy,
      });

      const jobWithReviews = {
        ...job.toJSON(),
        createdBy: {
          ...job.createdBy.toJSON(),
          reviews: createdByReviews,
        },
      };

      return res.status(200).json({
        data: jobWithReviews,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  //////////////////////////////////////////////////////
  static async createJob(req, res) {
    try {
      console.log("Conteoller lIne 144 " + req.body);
      console.log(req.body);
      const images = req?.files?.images;

      const imagePaths = uploadFiles(images, `jobs/${req.user._id}`);
      req.body.images = imagePaths;

      req.body.createdBy = req.user._id;
      const job = await Job.create(req.body);

      return res.status(201).json({
        message: "GIG created!",
        data: job.toJSON(),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  ////////////////////////////////////////////////

  static async updateJob(req, res) {
    try {
      // get job created by user is same as user who is updating job
      const oldJob = await Job.findOne({
        _id: req.params.id,
        createdBy: req.user._id,
      });

      if (!oldJob) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const jobUpdate = req.body;

      // update values
      if (jobUpdate.status === Status.Inactive) {
        if (oldJob.status === Status.Assigned) {
          return res.status(400).json({
            message: "Job is already assigned",
          });
        }
      } else if (jobUpdate.status === Status.Assigned) {
        if (oldJob.status === Status.Assigned) {
          return res.status(400).json({
            message: "GIG is already assigned",
          });
        }

        jobUpdate.assignedAt = new Date();
      } else if (jobUpdate.status === Status.Completed) {
        if (oldJob.status === Status.Completed) {
          return res.status(400).json({
            message: "GIG is already completed",
          });
        }
        if (oldJob.status !== Status.Assigned) {
          return res.status(400).json({
            message: "GIG is not assigned",
          });
        }
        if (oldJob.status === Status.Canceled) {
          return res.status(400).json({
            message: "GIG is already canceled",
          });
        }
        if (oldJob.status === Status.Deleted) {
          return res.status(400).json({
            message: "GIG is already deleted",
          });
        }

        jobUpdate.completedAt = new Date();
      } else if (jobUpdate.status === Status.Canceled) {
        if (oldJob.status === Status.Canceled) {
          return res.status(400).json({
            message: "GIG is already canceled",
          });
        }
        if (oldJob.status !== Status.Assigned) {
          return res.status(400).json({
            message: "GIG is not assigned",
          });
        }
        if (oldJob.status === Status.Completed) {
          return res.status(400).json({
            message: "GIG is already completed",
          });
        }

        jobUpdate.canceledAt = new Date();
        jobUpdate.assignedTo = null;
      } else if (jobUpdate.status === Status.Deleted) {
        if (oldJob.status === Status.Deleted) {
          return res.status(400).json({
            message: "GIG is already deleted",
          });
        }

        jobUpdate.deletedAt = new Date();
      }

      const job = await Job.findByIdAndUpdate(req.params.id, jobUpdate, {
        new: true,
      })
        .populate("category")
        .populate("createdBy")
        .populate("assignedTo")
        .populate("reviews");

      return res.status(200).json({
        message: "GIG updated!",
        data: job.toJSON(),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async deleteJob(req, res) {
    try {
      // get job created by user is same as user who is updating job
      const jobCheck = await Job.findOne({
        _id: req.params.id,
        createdBy: req.user._id,
      });

      const job = await Job.findByIdAndUpdate(req.params.id, {
        status: Status.Deleted,
      });

      return res.status(200).json({
        message: "GIG deleted!",
        data: job.toJSON(),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async reviewJob(req, res) {
    try {
      const { rating, comment } = req.body;

      const job = await Job.findById(req.params.id).populate("reviews");

      if (!job) {
        return res.status(404).json({
          message: "GIG not found",
        });
      }

      const reviewedBy = req.user._id;
      const reviewedTo =
        job.createdBy.toString() === req.user._id
          ? job.assignedTo
          : job.createdBy;

      if (
        job.reviews.find(
          (review) =>
            review.reviewedBy === reviewedBy && review.reviewedTo === reviewedTo
        )
      ) {
        return res.status(400).json({
          message: "Review already exists",
        });
      }

      const review = await Review.create({
        reviewedBy,
        reviewedTo,
        reviewOf: job._id,
        rating,
        comment,
      });

      job.reviews.push(review);
      if (job.reviews.length === 2) {
        job.status = Status.Closed;
      }

      await job.save();

      return res.status(201).json({
        message: "Review sent!",
        data: review.toJSON(),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = JobController;
