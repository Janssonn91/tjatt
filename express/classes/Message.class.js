const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  time: {
    type: Date,
    default: Date.now
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'Channel'
  },
  room: String,
  text: String,
  textType: String,
  star: Boolean,
})

module.exports = mongoose.model('Message', messageSchema);