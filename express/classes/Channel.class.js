const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class Channel extends ModelAndRoutes {

  static get schema() {
    return {
      channelname: String,
      admin: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      content: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
      }],
      favorite: Boolean,
      open: Boolean,
      group: Boolean,
    }
  }
}