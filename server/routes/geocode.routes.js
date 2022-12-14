const express = require("express");
const GeocodeController = require("../controllers/geocode.controller");
const GeocodeValidations = require("../validations/geocode.validations");
const validateRequest = require("../middlewares/validateRequest");

const router = express.Router();

router.get(
  "/address/:lat/:lng",
  validateRequest(GeocodeValidations.getAddressFromLatLngSchema()),
  GeocodeController.getAddressFromLatLng
);
router.get(
  "/latlng/:address",
  validateRequest(GeocodeValidations.getLatLngFromAddressSchema()),
  GeocodeController.getLatLngFromAddress
);

module.exports = router;
