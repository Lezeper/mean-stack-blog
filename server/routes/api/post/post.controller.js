var Post = require('./post.model');
var _ = require('lodash');

exports.findAllPosts = function(req, res){
  Post.find({}).sort({
    created: -1
  }).exec(function (err, posts) {
    if(err){ return res.status(500).send(err); }
    return res.status(200).send(posts);
  })
};

exports.findPostById = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err){ return res.status(500).send(); }
    return res.status(200).send(post);
  });
};

exports.createPost = function(req, res){
  var title = req.body.title;
  var contents = req.body.contents;

  if(_.isEmpty(title)){
    return res.status(422).send('InvalidParam');
  }

  var post = new Post({
    title: title,
    contents: contents,
    created: new Date().toISOString()
  });
  post.save(function(err){
    if(err){ return res.status(500).send(err); }
    return res.status(201).send();
  });
};

exports.updatePost = function(req, res){
  var id = req.body._id;
  var updateTitle = req.body.title;
  var updateContents = req.body.contents;

  Post.findById(id, function(err, post){
    post.title = updateTitle;
    post.contents = updateContents;
    post.save(function(err){
      if(err){ return res.status(500).send(err); }
      return res.status(201).send();
    });
  });
};

exports.destroyPost = function(req, res){
  Post.findByIdAndRemove(req.params.id, function(err){
    if(err){ return res.send(500, err); }
    return res.send(204);
  });
};