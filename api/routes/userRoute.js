'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  app.route('/users/:userId')
    .get(user.get_user)
    .put(user.update_user)
    .delete(user.delete_user);
};