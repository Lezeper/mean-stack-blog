(function () {

  angular.module('meanApp')
  .controller('loginCtrl', ['$scope', '$location', 'authentication', '$rootScope',
    function ($scope, $location, authentication, $rootScope) {

    $scope.error = false;
    $rootScope.$broadcast('showRightBar', false);
      
    $scope.onSubmit = function () {
      authentication
        .login($scope.credentials)
        .error(function(){
          $scope.error = true;
        })
        .then(function(){
          window.location.href = "/admin";
        });
    };
  }]);
})();