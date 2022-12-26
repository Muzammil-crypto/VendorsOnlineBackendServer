const yup = require("yup");
var ObjectId = require("mongoose").Types.ObjectId;

class ProductValidation {
  static getAllProducts() {
    return yup.object().shape({
      query: yup.object().shape({
        page: yup.number().integer().min(0).nullable(),
        limit: yup.number().integer().min(1).nullable(),
        status: yup.string(),

        // search: yup.string().nullable(),
        createdBy: yup.string().nullable(),
        // .test("ObjectId", "Invalid id", (value) => {
        //   if (!value) return true;
        //   return ObjectId.isValid(value);
        // }),
      }),
    });
  }
  static getProductById() {
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

  static createProduct() {
    return yup.object().shape({
      body: yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        shopId: yup.string().required("Shop ID is required"),

        price: yup.string().required("Budget is required"),
        images: yup.array().of(yup.mixed()),
      }),
    });
  }
}

module.exports = ProductValidation;
