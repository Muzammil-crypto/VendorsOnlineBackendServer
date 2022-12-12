const Geocode = require("../models/geocode.model");
const GeocodeSearch = require("../models/geocodeSearch.model");
const NodeGeocoder = require("node-geocoder");

const geocoder = NodeGeocoder({
  provider: "google",
  httpAdapter: "https",
  apiKey: process.env.GOOGLE_API_KEY,
  formatter: null,
});

class GeocodeController {
  static async getAddressFromLatLng(req, res) {
    try {
      const { lat, lng } = req.params;

      const inCache = await Geocode.findOne({
        latitude: lat,
        longitude: lng,
      });

      if (inCache) {
        return res.status(200).json({
          data: inCache,
        });
      }

      const response = await geocoder.reverse({
        lat: parseFloat(lat),
        lon: parseFloat(lng),
      });

      const results = [];
      for (let i = 0; i < response.length; i++) {
        const newGeocode = await Geocode.create(response[i]);
        results.push(newGeocode);
      }

      return res.status(200).json({
        data: response[0],
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async getLatLngFromAddress(req, res) {
    try {
      const { address } = req.params;

      const inCache = await GeocodeSearch.findOne({
        searchString: address,
      });

      if (inCache) {
        const data = await Geocode.find({
          _id: {
            $in: inCache.results,
          },
        }).sort({
          createdAt: -1,
        });

        return res.status(200).json({
          data: data.length > 10 ? data.slice(0, 10) : data,
        });
      }

      const response = await geocoder.geocode(address);

      const results = [];
      for (let i = 0; i < response.length; i++) {
        const newGeocode = await Geocode.create(response[i]);
        results.push(newGeocode);
      }
      await GeocodeSearch.create({
        searchString: address,
        results: results.map((r) => r._id),
      });

      return res.status(200).json({
        data: results.length > 10 ? results.slice(0, 10) : results,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = GeocodeController;
