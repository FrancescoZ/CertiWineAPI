'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wineSchema = new mongoose.Schema({
  name: String,
  year: Number,
  alcool: Number,
  sensor:
  {
    type: Schema.Types.ObjectId,
    ref: 'sensor',
    required: true
    },
  user: 
  { 
      type: Schema.Types.ObjectId, 
      ref: 'user',
      required: true
    }
});
mongoose.model('Wines', wineSchema);
