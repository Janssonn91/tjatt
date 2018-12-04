const Schema = require('mongoose').Schema;
const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class Repo extends ModelAndRoutes {

  static get schema() {
    return {
      name: String,
      url: String,
      gitUrl: String,
      port: String,
      running: Boolean,
      branchesCollapseOpen: Boolean
    }
  }
}