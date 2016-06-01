'use strict';

var express = require('express'),
    controller = require('./post.controller.js');

var router = express.Router();

router.get('/', controller.findAllPosts);
router.get('/:id', controller.findPostById);
router.post('/', controller.createPost);
router.put('/:id', controller.updatePost);
router.delete('/:id', controller.destroyPost);

module.exports = router;