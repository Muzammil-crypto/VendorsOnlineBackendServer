import BaseRoutes from './BaseRoutes';

class GeocodeAPI extends BaseRoutes {
  constructor() {
    super('/geocode');
  }

  getAddressFromLatLng = async (data) => {
    const res = await this._get(`/address/${data.lat}/${data.lng}`);

    return res;
  };

  getLatLngFromAddress = async (data) => {
    const res = await this._get(`/latlng/${data.address}`);

    return res;
  };
}

export default new GeocodeAPI();
