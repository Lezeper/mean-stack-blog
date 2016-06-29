(function () {

  angular.module('meanApp')
    .controller('adminCtrl', ['$scope', '$location', 'meanData', '$rootScope', function ($scope, $location, meanData, $rootScope) {

      $scope.user = {};
      $rootScope.$broadcast('showRightBar', true);
      
      $scope.clearAllLogs = function () {
        meanData.clearAllLogs().success(function () {
          $scope.getAllLogs();
        })
      };

      $scope.views =

      $scope.getAllLogs = function () {
        meanData.getAllLogs()
          .success(function (data) {
            $scope.logs = data;
          })
          .error(function (e) {
            console.log(e);
          });
      };

    }]);
})();
