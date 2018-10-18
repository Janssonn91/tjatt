const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class Channel extends ModelAndRoutes {

  static get schema() {
    return {
      id: Number,
      time: String,
      users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      content: String,
      star: Boolean,
    }
  }
}