var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../../config');

var auth = jwt({
  secret: config.secretKey,
  userProperty: 'payload'
});

var profileCtrl = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var postCtrl = require('../controllers/post');

// home page post
router.get('/post', postCtrl.findAllPosts);
router.get('/post/category', postCtrl.listCategory);
router.get('/post/category/:category', postCtrl.findPostsByCategory);
router.get('/post/keyword/:keyword', postCtrl.findPostsByKeyword);
router.get('/post/tag/:tag', postCtrl.findPostsByTag);
router.get('/post/tag', postCtrl.listTag);
router.get('/post/id/:id', postCtrl.findPostById);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// admin page
router.post('/post/', auth, postCtrl.createPost);
router.put('/post/id/:id', auth, postCtrl.updatePost);
router.delete('/post/id/:id', auth, postCtrl.destroyPost);

// profile
router.get('/profile', auth, profileCtrl.profileRead);


module.exports = router;
