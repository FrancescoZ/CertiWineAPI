'use strict';
module.exports = function(app) {
  var 
      wines = require('../controllers/wineController'),
      values = require('../controllers/valueController');

  app.route('/:userId/stations/:stationId/sensors/:sensorId/wines')    
    .get(wines.get_wines)

  app.route('/:userId/stations/:stationId/sensors/:sensorId/wines/:wineId')    
    .get(wines.get_wine)
    .post(values.new_value)
    .put(wines.create_wine);
    
  app.route('/:userId/stations/:stationId/sensors/wines/:wineId')
    .get(values.get_values_by_wine)
    .post(values.get_values_by_wine_since_until);
};