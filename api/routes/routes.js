'use strict';
var userRoutes = require('./userRoute'),
    error = require('../utils/error'),
    userNoAuthRoutes = require('./userNoAuthRoute'),
    wineRoutes = require('./wineRoute'),
    sensorRoutes = require('./sensorRoute'),
    valueRoutes = require('./valueRoute'),
    jwt = require('jsonwebtoken'),
    stationRoutes= require('./stationRoute'),
    cors = require('cors');

   

module.exports = function(app) {
    app.use(cors({origin: '*'}));
    userNoAuthRoutes(app);
    app.use(function(req, res,next) {
        var token = req.headers['x-access-token'];
        // decode token
        if (token) {
          // verifies secret and checks exp
          jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
            if (err) 
              return error.error('Failed to authenticate token.',res);    
            else
              // if everything is good, save to request for use in other routes
              req.decoded = decoded; 
              next();
          });
        } else 
          // if there is no token return an error
          return error.error('No token provided',res); 
      });
    userRoutes(app)
    wineRoutes(app);
    sensorRoutes(app);
    valueRoutes(app);    
    stationRoutes(app);
};