var JwtStrategy = require('passport-jwt').Strategy;
ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../routes/api/user/user.model');
var config = require('./config');

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secretKey;
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function (err, user) {
      if(err){ return done(err, false); }
      if(user){
        done(null, user);
      }else{
        done(null, false);
      }
    });
  }));
};