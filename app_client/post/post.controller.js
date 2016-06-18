(function () {

  angular.module('meanApp')
    .controller('postCtrl', ['$scope', '$routeParams', 'meanData', '$rootScope',
      function ($scope, $routeParams, meanData, $rootScope) {

        $rootScope.$broadcast('showRightBar', false);

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