const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hasha = require('hasha');

const UserSchema = new Schema({
  id: String,
  username: String,
  password: String,
  nickname: String,
  image: String,
  status: Boolean,
  date: {
    type: Date,
    default: Date.now()
  },
  channel: [{
    type: Schema.Types.ObjectId,
    ref: 'Channel'
  }],
  contact: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
});



module.exports = mongoose.model('User', UserSchema);