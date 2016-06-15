(function () {

  angular.module('meanApp')
    .controller('adminPostCtrl', ['$scope', '$location', 'meanData', function ($scope, $location, meanData) {

      $scope.isShowPostsTable = true;
      $scope.isShowAddPost = false;
      $scope.isShowUpdatePost = false;

      meanData.getAllPosts()
        .success(function (data) {
          $scope.posts = data;
        })
        .error(function (e) {
          console.log(e);
        });

      $scope.findPostById = function (id) {
        meanData.getPostById(id)
          .success(function (data) {
            $scope.updatePostData = data;
            $scope.isShowUpdatePost = true;
            $scope.isShowPostsTable = false;
          })
          .error(function (e) {
            console.log(e);
          });
      };

      $scope.createPost = function () {
        meanData.createPost($scope.newPost)
          .success(function () {
            window.location.reload();
          })
          .error(function (e) {
            console.log(e);
          });
      };

      $scope.updatePost = function (id) {
        meanData.updatePost(id, $scope.updatePostData)
          .success(function () {
            window.location.reload();
          })
          .error(function (e) {
            console.log(e);
          });
      };

      $scope.destroyPost = function (id) {
        if (confirm("Are you sure to remove this post?")) {
          meanData.destroyPost(id)
            .success(function () {
              window.location.reload();
            })
            .error(function (e) {
              console.log(e);
            });
        }
      };

    }]);
})();
