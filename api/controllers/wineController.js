'use strict';
var mongoose = require('mongoose'),
  Wine = mongoose.model('Wines'),
  Sensor = mongoose.model('Sensors'),
  Value = mongoose.model('Values'),
  error = require('../utils/error');

exports.get_wines = function(req, res, next) {
    Wine.findOne({
        "sensor": req.params.sensorId,
        "user": req.params.userId,
        "station": req.params.stationId
    }, function(err, wines) {
        if (err)
            return error.error(err.message,res);
        res.json(wines);
        next();
    });
}

exports.get_wine = function(req, res, next) {
    Wine.findOne({
        "_id" : req.params.windId,
        "sensor": req.params.sensorId,
        "user": req.params.userId,
        "station": req.params.stationId
    }, function(err, wine) {
        if (err)
            return error.error(err.message,res);
        res.json(wine);
        next();
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
        Wine.findOne({ 
            "_id": req.params.wineId
        }, function(err,wine){
            if (err)
            return error.error(err.message,res);
            wine.station = req.params.stationId;
            wine.sensor = req.params.sensorId;
            wine.user = req.params.userId;
            wine.name = req.body.name;
            wine.year = req.body.year;
            wine.info = req.body.info

            Sensor.save(sensor, function(err){
                if (err)
                    return error.error(err.message,res);
                Wine.save(wine, function(err){
                    if (err)
                        return error.error(err.message,res);
                    res.json("Wine Created");
                    next();
                });
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