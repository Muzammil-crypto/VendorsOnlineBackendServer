const mongoose = require('mongoose');

/**
 * @typedef GeocodeSearch
 * @property {string} _id
 * @property {string} searchString
 * @property {array} results
 *  @property {ObjectId} geocodeId
 */

const GeocodeSearchSchema = new mongoose.Schema(
  {
    searchString: {
      type: String,
    },
    results: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Geocode',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const GeocodeSearch = mongoose.model('GeocodeSearch', GeocodeSearchSchema);
module.exports = GeocodeSearch;
