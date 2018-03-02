'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sensorSchema = new mongoose.Schema({

  name: { 
    type: String,
    required: true,
    },
  battery: Number,
  state: String,
  station: {
      type: Schema.Types.ObjectId,
      ref: "Stations",
      required: false
  },
  user: 
  { 
      type: Schema.Types.ObjectId, 
      ref: 'Users',
      required: true
    }
});
mongoose.model('Sensors', sensorSchema);
