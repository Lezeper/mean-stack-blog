(function () {

  angular.module('meanApp')
  .controller('loginCtrl', ['$scope', '$location', 'authentication', function ($scope, $location, authentication) {

    $scope.error = false;

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