const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class Message extends ModelAndRoutes {

  static get schema() {
    return {
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
    }
  }
}