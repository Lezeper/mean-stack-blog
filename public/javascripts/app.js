angular.module('myApp', [])
  .controller('myController', function ($scope, $http) {

    $http.get('/api/post').then(function (res) {
      $scope.posts = res.data;
    });
  })

  .controller('adminController', function ($scope, $http) {

    $http.get('/api/post').then(function (res) {
      $scope.posts = res.data;
    });

    $scope.findPostById = function(id){
      $http.get('/api/post/' + id).then(function(res){
        $scope.updatePostData = res.data;
      });
    };

    $scope.createPost = function(){
      $http.post('/api/post/', $scope.newPost).then(function(data){
        window.location.reload();
      });
    };

    $scope.updatePost = function(id){
      $http.put('/api/post/'+ id, $scope.updatePostData).then(function (data) {
        window.location.reload();
      });
    };

    $scope.destroyPost = function(id){
      if(confirm("Are you sure to remove this post?")){
        $http.delete('/api/post/'+ id).then(function (data) {
          window.location.reload();
        })
      }
    };

  });



