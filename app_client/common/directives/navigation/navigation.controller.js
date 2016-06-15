(function () {

  angular.module('meanApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$scope', '$location', 'authentication'];
  function navigationCtrl($scope, $location, authentication) {

    $scope.isLoggedIn = authentication.isLoggedIn();

    $scope.currentUser = authentication.currentUser();

  }

})();