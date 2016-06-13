var express = require('express');
var adminRoutes = express.Router();
var userCtrl = require('./api/user/user.controller');

module.exports = function (app) {

  var year = new Date().getFullYear();

  app.use('/api/user', require('./api/user'));

  app.use('/api/post', require('./api/post'));

  app.get('/', function (req, res) {
    res.render('index', {title: 'My Blog', year: year});
  });

  app.get('/p/:id', function (req, res) {
    res.render('post', {title: req.params.id, postId: req.params.id, year: year});
  });

  app.get('/login', function (req, res) {
    var error = req.param("error");
    res.render('login', {error: error, title: 'Login', year: year});
  });
  /***************************** Middleware ********************************
  adminRoutes.post('/auth', userCtrl.authority(req, res));

  adminRoutes.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secretKey, function (err, decoded) {
        if (err) {
          return res.json({success: false, message: 'Failed to authenticate token.'});
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });

    }
  });*/

  adminRoutes.get('/', function (req, res) {
    res.render('admin', {title: 'Admin Panel', year: year});
  });

  app.use('/admin', adminRoutes);

};