var mongoose = require('mongoose');
var Log = mongoose.model('Log');
var _ = require('lodash');

module.exports.createLog = function (ip, info) {
  var log = new Log({
    info: info,
    trigger: ip,
    created: new Date().toISOString()
  });

  log.save(function (err) {
    if(err){
      console.log(err);
    }
  });
};

module.exports.findAllLogs = function (req, res) {
  Log.find({}).sort({
    created: -1
  }).exec(function (err, logs) {
    if (err) {
      return res.send(500, err);
    }
    res.json(logs);
  });
};

module.exports.isLogExists = function (ip, info, callback) {
  var isExists = null;
  Log.find({info: info, trigger: ip}).sort({
    created: -1
  }).exec(function (err, logs) {
    if (err) {
      isExists = false;
    }else{
      isExists = !_.isEmpty(logs);
    }
    callback(isExists);
  });
};

module.exports.findByTrigger = function (trigger, res) {
  Log.find({trigger: trigger}).sort({
    created: -1
  }).exec(function (err, logs) {
    if (err) {
      return res.send(500, err);
    }
    res.json(logs);
  });
};

module.exports.clearLogs = function (req, res) {
  Log.remove({}, function (err) {
    if(err){
      return res.send(500, err);
    }
    res.json();
  });
};