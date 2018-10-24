const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class User extends ModelAndRoutes {

  static get schema() {
    return {
      id: Number,
      name: String,
      password: String,
      nickname: String,
      image: String,
      status: Boolean,
      group: [{
        admin: String,
        groupname: String,
        member: [String],
        channel: [{
          type: Schema.Types.ObjectId,
          ref: 'Channel'
        }]
      }],
      contact: [{
        id: Number,
        channel: [{
          type: Schema.Types.ObjectId,
          ref: 'Channel'
        }],
        favorite: Boolean
      }],
    }
  }
}