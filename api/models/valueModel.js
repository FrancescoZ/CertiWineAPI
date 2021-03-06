'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var valueSchema = new mongoose.Schema({
  date:{
      type: Date,
      required: true,
      unique: true
  },
  vibration: {
    type: Number,
    required: true
    },
  light: {
    type: Number,
    required: true
    },
  temperature:  {
    type: Number,
    required: true
    },
  humidity: {
    type: Number,
    required: true
    },
  wine:
  {
    type: Schema.Types.ObjectId,
    ref: 'Wines',
    required: true
    },
});
mongoose.model('Values', valueSchema);
