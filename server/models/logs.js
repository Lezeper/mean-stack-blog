var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
  info:{
    type: String,
    required: true
  },
  trigger:{
    type: String,
    required: true
  },
  created:{
    type: Date,
    required: true
  }
});

mongoose.model('Log', logSchema);