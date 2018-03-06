'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wineSchema = new mongoose.Schema({
  name: String,
  year: Number,
  info: String,
  sensor:
  {
    type: Schema.Types.ObjectId,
    ref: 'Sensors',
    required: true
    },
  station:
  {
    type: Schema.Types.ObjectId,
    ref: 'Stations',
    required: true
    },
  user: 
  { 
      type: Schema.Types.ObjectId, 
      ref: 'Users',
      required: true
    }
});
mongoose.model('Wines', wineSchema);
