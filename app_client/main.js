(function () {

  angular.module('meanApp', [
    'ngRoute', 'meanApp.admin', 'bw.paging', 'ui.tinymce'
  ]).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.view.html',
        controller: 'homeCtrl'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/p/:id', {
        templateUrl: '/post/post.view.html',
        controller: 'postCtrl'
      })
      .when('/p', {
        templateUrl: '/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);

  }]).controller('mainCtrl', function ($scope) {
      $scope.year = 2015;

  }).filter('range', function() {
    return function(input, total) {
      total = parseInt(total);

      for (var i=0; i<total; i++) {
        input.push(i);
      }

      return input;
    };
  }).filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode){
      return $sce.trustAsHtml(htmlCode);
    }
  }]).filter("sanitizeReadMore", ['$sce', function($sce) {
    return function(htmlCode, id){
      if(htmlCode.indexOf("<!--more-->") > -1 ){
        htmlCode = htmlCode.substring(0, htmlCode.indexOf("<!--more-->"));
        htmlCode += ("<hr><h4><a href='/p/"+id+"'>Read More...</a></h4>");
      }
      return $sce.trustAsHtml(htmlCode);
    }
  }]).controller("footerCtrl", function ($scope) {
    $scope.year = new Date().getFullYear();
  });

  angular.module('meanApp.admin', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: '/admin/overview/admin.overview.view.html',
        controller: 'adminCtrl',
        controllerAs: 'vm'
      })
      .when('/admin/post', {
        templateUrl: '/admin/post/admin.post.view.html',
        controller: 'adminPostCtrl',
        controllerAs: 'vm'
      })

  }]).run(['$rootScope', '$location', 'authentication', function ($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
      if (!authentication.isLoggedIn()) {
        if($location.path() === '/admin' || $location.path() === '/admin/post'){
          $location.path('/');
        }
      }
    });
  }]);

})();
