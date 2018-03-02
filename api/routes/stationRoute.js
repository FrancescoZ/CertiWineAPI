'use strict';
module.exports = function(app) {
  var stations = require('../controllers/stationController'),
      sensors = require('../controllers/sensorController'),
      values = require('../controllers/valueController');

  app.route('/:userId/stations')
    .get(stations.get_stations_by_user)
    .put(stations.new_station);
  
  app.route('/:userId/stations/:stationId')    
    .put(stations.update_station_name)
    .post(stations.update_station);
  
  app.route('/:userId/stations/:stationId/sensors')
    .get(sensors.get_sensor_by_station);
    
  
  app.route('/:userId/stations/:stationId/sensors/:sensorId')
    .put(sensors.pair)
    .get(values.get_values_by_sensor)
    .post(values.new_value);
};