const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const bcrypt = require('bcrypt');

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

// UserSchema.pre('save', function (next) {
//   let user = this;

//   if (!user.isModified('password')) return next();
//   bcrypt.genSalt(10, function (err, salt) {
//     if (err) return next(err)
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });

module.exports = mongoose.model('User', UserSchema);