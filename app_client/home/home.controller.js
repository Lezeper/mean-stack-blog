(function () {

  angular.module('meanApp')
    .controller('homeCtrl', ['$scope', '$routeParams', 'meanData', function ($scope, $routeParams, meanData) {

      var max = 2;


      meanData.getAllPosts()
        .success(function (data) {
          $scope.posts = data;

          if (data.length > max) {
            $scope.pages = data.length / max;
            var remind = data.length % max;

          }
        });

      $scope.$on('posts', function (event, arg) {
        $scope.posts = arg;
      });

    }]);
})();