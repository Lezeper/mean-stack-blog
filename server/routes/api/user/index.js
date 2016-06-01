'use strict';

var express = require('express'),
    controller = require('./user.controller.js');

var router = express.Router();

router.get('/', controller.findAllUser);
router.post('/', controller.createUser);
router.post('/auth', controller.authenticate);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.destroyUser);

module.exports = router;
