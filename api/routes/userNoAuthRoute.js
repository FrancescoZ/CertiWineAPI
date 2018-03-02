'use strict';
module.exports = function(app) {
  var user = require('../controllers/userNoAuthController');
  app.route('/users')
    .put(user.create_user);
    
  app.route('/authenticate')
    .post(user.authenticate_user);
}