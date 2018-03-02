'use strict';
var mongoose = require('mongoose'),
  error = require('../utils/error'),
  User = mongoose.model('Users'),
  config = require('../../config'),
  jwt = require('jsonwebtoken');


exports.create_user = function(req, res, next) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) 
      return error.error('Passwords do not match.',res);
    
    if (req.body.email &&
      req.body.password &&
      req.body.passwordConf) {
      var userData = {
        email: req.body.email,
        password: req.body.password
      }
      //use schema.create to insert data into the db
      User.create(userData, function (err, user) {
        if (err) 
          return error.error(err.message,res);
        else 
          return res.json();
      });
    } else 
      return error.error('Missing values',res);
  };

exports.authenticate_user = function(req, res, next) {
    if (!req.body.email || !req.body.password){
      return error.error('Credential are missing',res);
    }
    User.authenticate(req.body.email,req.body.password, function(err,user){
      if (!user)
        return error.error('Wrong Credential',res);
      else{
        const payload = {
          data: req.body.email+req.body.password
        };
        var token = jwt.sign(payload, config.secret, {
          expiresIn: "30 days"
        });
        return res.json(token);
      }

    });
    
};
