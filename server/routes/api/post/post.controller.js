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
  var category = req.body.category;
  var tags = req.body.tags;

  if(_.isEmpty(title) && _.isEmpty(contents) && _.isEmpty(category)){
    return res.status(422).send('InvalidParam');
  }

  var post = new Post({
    title: title,
    contents: contents,
    category: category,
    tags : tags,
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
  var updateCategory = req.body.category;
  var updateTags = req.body.tags;

  Post.findById(id, function(err, post){
    post.title = updateTitle;
    post.contents = updateContents;
    post.category = updateCategory;
    post.tags = updateTags;
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