'use strict';
var mongoose = require('mongoose'),
  Value = mongoose.model('Values'),
  error = require('../utils/error');

exports.get_values_by_sensor_since_until = function(req, res, next) {
    if (req.body.start &&
        req.body.end){
        Value.find({
            "date": {
                $gte: ISODate(req.body.start),
                $lt: ISODate(req.body.end)
            },
            "sensor" : req.params.sensorId
        },
        function(err, values){
            res.json(values);
            next();
        });
    } else 
        return error.error('Missing values',res);
}

exports.get_values_by_sensor = function(req, res, next) {
    Value.find({
        "sensor" : req.params.sensorId
      },
      function(err, values){
        res.json(values);
        next();
      });
}

exports.new_value = function(req, res, next){
    if (req.body.date &&
        req.body.vib &&
        req.body.light &&
        req.body.hum &&
        req.body.temp &&
        req.params.sensorId) {
        var value = {
            date: Date(req.body.date),
            vibration: req.body.vib,
            light: req.body.light,
            temperature: req.body.temp,
            humidity: req.body.hum,
            sensor: req.params.sensorId
            }
        Value.create(value,function (err, value) {
          if (err) 
            return error.error(err.message,res);
          else 
            return res.json("Value added");
        });
    } else 
       return error.error('Missing values',res);
}

exports.delete_value = function(req, res, next) {
    Value.remove({
    _id: req.params.valueId
  }, function(err, value) {
    if (err)
      return error.error(err.message,res);
    res.json({ message: 'Value successfully deleted' });
  });
};