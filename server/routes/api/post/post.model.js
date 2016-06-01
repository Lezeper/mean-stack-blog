'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  contents:{
    type: String
  },
  created:{
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Post", PostSchema);