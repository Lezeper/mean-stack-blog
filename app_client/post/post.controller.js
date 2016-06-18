(function () {

  angular.module('meanApp')
    .controller('postCtrl', ['$scope', '$routeParams', 'meanData', function ($scope, $routeParams, meanData) {

      if($routeParams.id){
        meanData.getPostById($routeParams.id)
          .success(function (data) {
            $scope.post = data;
          })
      }

      $scope.prismHighlight = function () {
        Prism.highlightAll ();
      };

    }]);
})();