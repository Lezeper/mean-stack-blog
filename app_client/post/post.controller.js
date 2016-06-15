(function () {

  angular.module('meanApp')
    .controller('postCtrl', ['$scope', '$routeParams', 'meanData', function ($scope, $routeParams, meanData) {

      if($routeParams.category){
        meanData.getPostsByCategory($routeParams.category)
          .success(function (data) {
            $scope.posts = data;
          });
      }

      if($routeParams.keyword){
        meanData.getPostsByKeyword($routeParams.keyword).success(function (data) {
          $scope.posts = data;
        });
      }

      if($routeParams.tag){
        meanData.getPostsByTag($routeParams.tag)
          .success(function (data) {
            $scope.posts = data;
          });
      }

      if($routeParams.id){
        meanData.getPostById($routeParams.id)
          .success(function (data) {
            $scope.post = data;
          })
      }
    }]);
})();