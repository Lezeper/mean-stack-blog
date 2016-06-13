'use strict';

var express = require('express'),
    controller = require('./user.controller.js');
var jwt = require('express-jwt');
var config = require('../../../config/config');

var router = express.Router();

var auth = jwt({
  secret: config.secretKey,
  userProperty: 'payload'
});

router.get('/', auth, controller.findAllUser);
router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.destroyUser);

module.exports = router;
