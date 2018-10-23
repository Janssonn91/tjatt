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

UserSchema.pre('save', function(next){
  // hash the password  - but only if it has been modified (or is new)
  if (this.isModified('password')){
    this.password = hasha(
      this.password + global.passwordSalt, 
      {encoding: 'base64', algorithm: 'sha512'}
    );
  }
  next();
});



module.exports = mongoose.model('User', UserSchema);