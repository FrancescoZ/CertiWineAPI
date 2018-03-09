'use strict';
var mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  jwt = require('jsonwebtoken'),
  error = require('../utils/error');

exports.update_alert = function(req, res, next){
  User.findById(req.params.userId, function(err, user) {
    if (err)
      return error.error(err.message,res);

    user.alert_vib = req.body.alert_vib;
    user.alert_light = req.body.alert_light;
    user.alert_temp = req.body.alert_temp;
    user.alert_hum = req.body.alert_hum;
    user.save(user, function(err){
      if (err)
        return error.error(err.message,res);
      res.json(user);
    });
    
  });
}


exports.update_user = function(req, res, next){
  User.findById(req.params.userId, function(err, user) {
    if (err)
      return error.error(err.message,res);
    user.email = req.body.email;
    user.password = req.body.password;
    User.save(user, function(err){
      if (err)
        return error.error(err.message,res);
      res.json("Settings Updated\n");
      next();
    });
    
  });
}

exports.get_user = function(req, res, next) {
    User.findById(req.params.userId, function(err, user) {
    if (err)
      return error.error(err.message,res);
    res.json(user);
  });
};

exports.delete_user = function(req, res, next) {
    User.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      return error.error(err.message,res);
    res.json({ message: 'User successfully deleted' });
  });
};