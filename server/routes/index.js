var express = require('express');

module.exports = function (app) {

  var year = new Date().getFullYear();

  app.use('/api/user', require('./api/user'));

  app.use('/api/post', require('./api/post'));

  app.route('/').get(function (req, res) {
    res.render('index', {　title: 'My Blog', year: year　});
  });

  app.route('/admin').get(function (req, res){
    res.render('admin', {　title: 'Admin Panel', year: year　});
  });

  app.route('/login').get(function (req, res) {
    res.render('login', { title: 'Login', year: year });
  })

};