const yup = require('yup');

class GeocodeValidations {
  static getLatLngFromAddressSchema() {
    return yup.object().shape({
      params: yup.object().shape({
        address: yup.string().required('Address is required'),
      }),
    });
  }

  static getAddressFromLatLngSchema() {
    return yup.object().shape({
      params: yup.object().shape({
        lat: yup.number().required('Latitude is required'),
        lng: yup.number().required('Longitude is required'),
      }),
    });
  }
}

module.exports = GeocodeValidations;
