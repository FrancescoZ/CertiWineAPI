'use strict';
var mongoose = require('mongoose'),
  Wine = mongoose.model('Wines'),
  Sensor = mongoose.model('Sensors'),
  Value = mongoose.model('Values'),
  error = require('../utils/error');

exports.get_wines = function(req, res, next) {
    Wine.find({
        "user": req.params.userId,
        "station": req.params.stationId
    }, function(err, wines) {
        if (err)
            return error.error(err.message,res);
        res.json(wines);
    });
}

exports.get_wine = function(req, res, next) {
    Wine.findOne({
        "_id" : req.params.wineId,
        "sensor": req.params.sensorId,
        "user": req.params.userId,
        "station": req.params.stationId
    }, function(err, wine) {
        if (err)
            return error.error(err.message,res);
        res.json(wine);
    });
}

exports.create_wine = function(req, res, next) {
    Sensor.findOne({
        "_id": req.params.sensorId,
        "user": req.params.userId,
        "active": false
    }, function(err, sensor) {
        if (err)
            return error.error(err.message,res);
        sensor.active = true
        var wine = {
            station: req.params.stationId,
            sensor: req.params.sensorId,
            user: req.params.userId,
            name: req.body.name,
            year: req.body.year,
            info: req.body.info
        }

        sensor.save(sensor, function(err){
            if (err)
                return error.error(err.message,res);
            Wine.create(wine, function(err, wineSaved){
                if (err)
                    return error.error(err.message,res);
                return res.json(wineSaved);
            });
        });
    });
}

exports.delete_wine = function(req, res, next) {
    Wine.remove({
    _id: req.params.wineId
  }, function(err, value) {
    if (err)
      return error.error(err.message,res);
    res.json({ message: 'Wine successfully deleted' });
  });
};