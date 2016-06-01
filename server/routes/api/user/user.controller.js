var User = require('./user.model');
var _ = require('lodash');
var jwt = require('jwt-simple');
var config = require('../../../config/config');

exports.findAllUser = function(req, res){
  User.find({}).sort({
    created: -1
  }).exec(function(err, users){
    if(err){ return res.status(500).send(err); }
    return res.status(200).send(users);
  });
};

exports.createUser = function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  if(_.isEmpty(username) || _.isEmpty(password)){ return res.status(422).send("InvalidParam"); }

  var user = new User({
    username: username,
    password: password,
    role: "USER",
    created: new Date().toISOString()
  });
  user.save(function(err){
    if(err){ return res.status(500).send(err); }
    return res.status(201).send();
  });
};

exports.updateUser = function(req, res){
  var id = req.body._id;
  var username = req.body.username;
  var password = req.body.password;

  User.findById(id, function(err, user){
    user.username = username;
    user.password = password;
    user.save(function(err){
      if(err){ return res.status(500).send(err); }
      return res.status(204).send();
    });
  });
};

exports.destroyUser = function(req, res){
  User.findByIdAndRemove(req.params.id, function(err){
    if(err){ return res.status(500).send(err); }
    return res.send(204);
  });
};

exports.authenticate = function (req, res) {
  User.findOne({
    name: req.body.username
  }, function (err, user) {
    if(err){ throw err; }
    if(!user){ res.send({sucess: false, msg: 'Authentication failed. User not found.'});
    }else{
      user.comparePassword(req,body.password, function (err, isMatch) {
        if(isMatch && ! err){
          var token = jwt.encode(user, config.secretKey);
          res.json({success: true, token: 'JWT ' + token});
        }else{
          res.send({success: false, msg: 'Authentication failed, Wrong password.'});
        }
      });
    }
  });
};