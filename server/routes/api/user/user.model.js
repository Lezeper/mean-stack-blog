'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  username:{
    type: String,
    require: true
  },
  password:{
    type: String,
    require: true
  },
  role:{
    type: String,
    require: true
  },
  created:{
    type: Date,
    require: true
  }
});

UserSchema.pre('save', function (next) {
  var user = this;
  if(this.isModified('password') || this.isNew){
    bcrypt.genSalt(10, function (err, salt) {
      if(err){ return next(err); }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if(err){ return next(err); }
        user.password = hash;
        next();
      });
    });
  }else{
    return next();
  }
});

UserSchema.methods.comparePassword = function(passwd, cb){
  bcrypt.compare(passwd, this.password, function (err, isMatch) {
    if(err){ return cb(err); }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);