(function () {

  angular.module('meanApp')
    .controller('rightbarCtrl', ['$scope', 'meanData', 'authentication', '$route', '$rootScope', '$location',
      function ($scope, meanData, authentication, $route, $rootScope, $location) {

        $scope.isLoggedIn = authentication.isLoggedIn();

        $scope.logout = function () {
          authentication.logout();
          window.location.href = "/";
        };

        $scope.search = function () {
          if($location.path() != '/'){ window.location.href="/"; }
          if($scope.keyword != ''){
            meanData.getPostsByKeyword($scope.keyword).success(function (data) {
              $rootScope.$broadcast('posts', data);
            })
          }else{
            meanData.getAllPosts().success(function (data) {
              $rootScope.$broadcast('posts', data);
            });
          }
        };

        meanData.listCategory().success(function (data) {
          $scope.categories = data;
        });

        meanData.listTag().success(function (data) {
          $scope.tags = data;
        })
      }]);

})();