(function () {

  angular.module('meanApp')
    .controller('homeCtrl', ['$scope', '$routeParams', 'meanData', 'authentication', '$rootScope',
      function ($scope, $routeParams, meanData, authentication,$rootScope ) {

        $scope.pageSize = 5;
        $rootScope.$broadcast('showRightBar', true);
        $scope.isLoggedIn = authentication.isLoggedIn();

        var defaultPaging = function (length) {
          $scope.totalPage = length / $scope.pageSize;
          $scope.totalSize = length;
          if (length > $scope.pageSize) {
            for (var i = 1; i <= $scope.pageSize; i++) {
              $scope["isShowPost" + i] = true;
            }
          } else {
            for (var l = 1; l <= length; l++) {
              $scope["isShowPost" + l] = true;
            }
          }
        };

        if (!$routeParams.category && !$routeParams.keyword && !$routeParams.tag) {
          meanData.getAllPosts()
            .success(function (data) {
              $scope.posts = data;
              defaultPaging(data.length);
            });
        }

        if ($routeParams.category) {
          meanData.getPostsByCategory($routeParams.category)
            .success(function (data) {
              $scope.posts = data;
              defaultPaging(data.length);
            });
        }

        if ($routeParams.keyword) {
          meanData.getPostsByKeyword($routeParams.keyword).success(function (data) {
            $scope.posts = data;
            defaultPaging(data.length);
          });
        }

        if ($routeParams.tag) {
          meanData.getPostsByTag($routeParams.tag)
            .success(function (data) {
              $scope.posts = data;
              defaultPaging(data.length);
            });
        }

        $scope.changePage = function (page) {

          for (var i = (page - 1) * $scope.pageSize + 1; i <= (page - 1) * $scope.pageSize + $scope.pageSize; i++) {
            $scope["isShowPost" + i] = true;
          }
          for (var j = 1; j <= (page - 1) * $scope.pageSize; j++) {
            $scope["isShowPost" + j] = false;
          }
          for (var k = page * $scope.pageSize + 1; k <= $scope.totalSize; k++) {
            $scope["isShowPost" + k] = false;
          }
        };

        $scope.$on('posts', function (event, data) {
          $scope.posts = data;
          defaultPaging(data.length);
        });

      }]);
})();