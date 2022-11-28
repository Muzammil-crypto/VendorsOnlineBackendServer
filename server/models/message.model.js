const mongoose = require('mongoose');

/**
 * @typedef Message
 * @property {string} _id
 * @property {string} text
 * @property {ObjectId} sender
 * @property {ObjectId} chat
 * @property {string} type
 * @property {ObjectId} job
 * @property {string} attachment
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const Schema = mongoose.Schema;
const MessageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['text', 'image', 'video', 'audio', 'file', 'reference'],
      default: 'text',
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    },
    referenceType: {
      type: String,
      enum: ['positive', 'negative', 'neutral'],
      default: 'neutral',
    },
    attachment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
