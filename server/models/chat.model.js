const mongoose = require('mongoose');

/**
 * @typedef Chat
 * @property {string} _id
 * @property {array} users
 *   @property {ObjectId} user
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const Schema = mongoose.Schema;
const ChatSchema = new Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
