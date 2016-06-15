(function () {

  angular.module('meanApp')
    .controller('adminPostCtrl', ['$scope', '$location', 'meanData', '$routeParams',
      function ($scope, $location, meanData, $routeParams) {

        $scope.isShowPostsTable = true;
        $scope.isShowAddPost = false;
        $scope.isShowUpdatePost = false;

        meanData.getAllPosts()
          .success(function (data) {
            $scope.posts = data;
          })
          .error(function (e) {
            alert(e.message);
          });

        if ($routeParams.eid) {
          meanData.getPostById($routeParams.eid)
            .success(function (data) {
              $scope.updatePostData = data;
              $scope.isShowUpdatePost = true;
              $scope.isShowPostsTable = false;
            })
            .error(function (e) {
              alert(e.message);
            });
        }

        $scope.createPost = function () {
          meanData.createPost($scope.newPost)
            .success(function () {
              window.location.reload();
            })
            .error(function (e) {
              alert(e.message);
            });
        };

        $scope.updatePost = function (id) {
          meanData.updatePost(id, $scope.updatePostData)
            .success(function () {
              window.location.reload();
            })
            .error(function (e) {
              alert(e.message);
            });
        };

        $scope.destroyPost = function (id) {
          if (confirm("Are you sure to remove this post?")) {
            meanData.destroyPost(id)
              .success(function () {
                window.location.reload();
              })
              .error(function (e) {
                alert(e.message);
              });
          }
        };

        $scope.tinymceOptions = {
          plugins: 'link image codesample advlist code preview',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | codesample | link image'
        };

      }]);
})();
