const yup = require("yup");
var ObjectId = require("mongoose").Types.ObjectId;

class JobValidations {
  static getAllJobs() {
    return yup.object().shape({
      query: yup.object().shape({
        page: yup.number().integer().min(0).nullable(),
        limit: yup.number().integer().min(1).nullable(),
        status: yup
          .string()

          .test("statuses", "Invalid status", (value) => {
            if (!value) return true;

            const statuses = [
              "active",
              "inactive",
              "assigned",
              "completed",
              "cancelled",
              "closed",
              "deleted",
            ];

            return value.split(",").every((item) => statuses.includes(item));
          }),
        search: yup.string().nullable(),
        createdBy: yup
          .string()
          .nullable()
          .test("ObjectId", "Invalid id", (value) => {
            if (!value) return true;
            return ObjectId.isValid(value);
          }),
      }),
    });
  }

  static getJobById() {
    return yup.object().shape({
      params: yup.object().shape({
        id: yup
          .string()
          .required()
          .test("ObjectId", "Invalid id", (value) => {
            return ObjectId.isValid(value);
          }),
      }),
    });
  }

  static createJob() {
    return yup.object().shape({
      body: yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        category: yup
          .string()
          .required("Category is required")
          .test("ObjectId", "Invalid id", (value) => {
            return ObjectId.isValid(value);
          }),
        company: yup.string(),
        location: yup
          .object()
          .shape({
            lat: yup.number().required("Location is required"),
            lng: yup.number().required("Location is required"),
            address: yup.string().required("Location is required"),
          })
          .required("Location is required"),
        budget: yup.string().required("Budget is required"),
        images: yup.array().of(yup.mixed()),
      }),
    });
  }

  static updateJob() {
    return yup.object().shape({
      params: yup.object().shape({
        id: yup
          .string()
          .required()
          .test("ObjectId", "Invalid id", (value) => {
            return ObjectId.isValid(value);
          }),
      }),
      body: yup.object().shape({
        title: yup.string(),
        description: yup.string(),
        category: yup.string().test("ObjectId", "Invalid id", (value) => {
          if (!value) return true;
          return ObjectId.isValid(value);
        }),
        company: yup.string(),
        location: yup.object(),
        budget: yup.string(),
        images: yup.array().of(yup.mixed()),
        status: yup
          .string()
          .oneOf([
            "active",
            "inactive",
            "assigned",
            "completed",
            "cancelled",
            "closed",
            "deleted",
          ]),
        assignedTo: yup.string().test("ObjectId", "Invalid id", (value) => {
          if (!value) return true;
          return ObjectId.isValid(value);
        }),
      }),
    });
  }

  static deleteJob() {
    return yup.object().shape({
      params: yup.object().shape({
        id: yup
          .string()
          .required()
          .test("ObjectId", "Invalid id", (value) => {
            return ObjectId.isValid(value);
          }),
      }),
    });
  }

  static reviewJob() {
    return yup.object().shape({
      params: yup.object().shape({
        id: yup
          .string()
          .required()
          .test("ObjectId", "Invalid id", (value) => {
            return ObjectId.isValid(value);
          }),
      }),
      body: yup.object().shape({
        rating: yup
          .number()
          .integer()
          .min(1, "Rating must be between 1 and 5")
          .max(5, "Rating must be between 1 and 5")
          .required("Rating is required"),
        comment: yup.string(),
      }),
    });
  }
}

module.exports = JobValidations;
