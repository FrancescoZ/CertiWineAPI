'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sensorSchema = new mongoose.Schema({

  name: { 
    type: String,
    required: true,
    },
  battery: {
      type: Number,
      default: 0,
      required: true
    },
  state: {
      type:String,
      required: true,
      default: "Active"
    },
  station: {
      type: Schema.Types.ObjectId,
      ref: "Stations",
      required: false
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  user: 
  { 
      type: Schema.Types.ObjectId, 
      ref: 'Users',
      required: true
    }
});
mongoose.model('Sensors', sensorSchema);
