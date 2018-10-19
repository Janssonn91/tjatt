const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class User extends ModelAndRoutes {

  static get schema() {
    return {
      id: String,
      username: String,
      password: String,
      nickname: String,
      image: String,
      status: Boolean,
      date: {
        type: Date,
        default: Date.now
      },
      channel: [{
        type: Schema.Types.ObjectId,
        ref: 'Channel'
      }],
      contact: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
    }
  }
}