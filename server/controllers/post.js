var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var logCtrl = require('../controllers/log');
var _ = require('lodash');

function ActivityRecorder(req, info){
  var ip = req.ip.split(':')[3];
  if(ip){
    // logCtrl.createLog(ip, info);
    logCtrl.isLogExists(ip, info, function (isExists) {
      if(!isExists){
        logCtrl.createLog(ip, info);
      }
    })
  }
}

module.exports.findAllPosts = function (req, res) {
  Post.find({}).sort({
    created: -1
  }).exec(function (err, posts) {
    if (err) {
      return res.send(500, err);
    }
    res.json(posts);
  });
  ActivityRecorder(req, "findAllPosts.");
};

module.exports.findPostById = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      return res.send(500, err);
    }
    return res.json(post);
  });
  ActivityRecorder(req, "check post id: "+req.params.id);
};

module.exports.findPostsByKeyword = function (req, res) {
  Post.find({
    "$or": [
      {'title': {$regex: req.params.keyword}},
      {'category': {$regex: req.params.keyword}},
      {'tags': {$regex: req.params.keyword}}
    ]
  }, function (err, posts) {
    if (err) {
      return res.send(500, err);
    }
    return res.json(posts);
  })
};

module.exports.findPostsByCategory = function (req, res) {
  Post.find({category: req.params.category}, function (err, posts) {
    if (err) {
      return res.send(500, err);
    }
    return res.json(posts);
  });
};

module.exports.findPostsByTag = function (req, res) {
  Post.find({tags: req.params.tag}, function (err, posts) {
    if (err) {
      return res.send(500, err);
    }
    return res.json(posts);
  })
};

module.exports.listCategory = function (req, res) {
  Post.aggregate({
    $group: {
      _id: '$category',
      sum: {$sum: 1}
    }
  }, function (err, result) {
    if (err) {
      return res.send(500, err);
    } else {
      res.json(result);
    }
  });
};

module.exports.listTag = function (req, res) {
  Post.distinct('tags', function (err, result) {
    if (err) {
      return res.send(500, err);
    } else {
      res.json(result);
    }
  })
};

module.exports.createPost = function (req, res) {
  var title = req.body.title;
  var contents = req.body.contents;
  var category = req.body.category;
  var tags = req.body.tags;

  if (_.isEmpty(title) && _.isEmpty(contents) && _.isEmpty(category)) {
    return res.status(422).send('InvalidParam');
  }

  var post = new Post({
    title: title,
    contents: contents,
    category: category,
    tags: tags,
    created: new Date().toISOString()
  });
  post.save(function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(201).json({
      "message": "Successful create post."
    });
  });
};

module.exports.updatePost = function (req, res) {
  var id = req.body._id;
  var updateTitle = req.body.title;
  var updateContents = req.body.contents;
  var updateCategory = req.body.category;
  var updateTags = req.body.tags;

  Post.findById(id, function (err, post) {
    post.title = updateTitle;
    post.contents = updateContents;
    post.category = updateCategory;
    post.tags = updateTags;
    post.save(function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(201).json({
        "message": "Successful update post."
      });
    });
  });
};

module.exports.destroyPost = function (req, res) {
  Post.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      return res.send(500, err);
    }
    return res.status(204).json({
      "message": "Successful delete post."
    });
  });
};