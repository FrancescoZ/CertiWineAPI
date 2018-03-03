'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stationSchema = new mongoose.Schema({

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
  user: 
  { 
      type: Schema.Types.ObjectId, 
      ref: 'Users',
      required: true
    }
});
mongoose.model('Stations', stationSchema);
