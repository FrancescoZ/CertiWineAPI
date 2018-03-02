'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stationSchema = new mongoose.Schema({

  name: { 
    type: String,
    required: true,
    },
  battery: Number,
  state: String,
  user: 
  { 
      type: Schema.Types.ObjectId, 
      ref: 'Users',
      required: true
    }
});
mongoose.model('Stations', stationSchema);
