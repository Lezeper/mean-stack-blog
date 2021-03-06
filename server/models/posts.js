
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  contents:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  tags:{
    type: [String]
  },
  created:{
    type: Date,
    required: true
  }
});

mongoose.model('Post', postSchema);
