(function () {

  angular.module('meanApp')
    .controller('adminCtrl', ['$scope', '$location', 'meanData', '$rootScope', function ($scope, $location, meanData, $rootScope) {

      $scope.user = {};
      $rootScope.$broadcast('showRightBar', true);
      meanData.getProfile()
        .success(function (data) {
          $scope.user = data;
        })
        .error(function (e) {
          console.log(e);
        });

    }]);
})();
