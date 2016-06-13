
angular.module('myApp', [])

  .factory('authHttpResponseInterceptor',[function(){
    return {
      responseError: function(rejection) {
        if (rejection.status === 401) {
          console.log("Response Error 401",rejection);
          window.location.href = "/login?error=1";
        }
        return $q.reject(rejection);
      }
    }
  }])
  .config(['$httpProvider',function($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
  }])

  .controller('homeController', function ($scope, $http) {

    $http.get('/api/post').then(function (res) {
      $scope.posts = res.data;
    });

    $scope.login = function () {

      $http.post('/admin/auth', $scope.user).then(function (res) {

        window.location.href="/admin";
      });
    }
  })
  
  .controller('adminController', function ($scope, $http) {

    $scope.isShowPostsTable = true;
    $scope.isShowAddPost = false;
    $scope.isShowUpdatePost = false;
    $scope.isShowAdminPostSectioin = false;

    $scope.showPost = function (id) {
      $http.get('/api/post/' + id).then(function (res) {
        $scope.post = res.data;
      });
    };
    $http.get('/api/post').then(function (res) {
      $scope.posts = res.data;
    });

    $scope.findPostById = function(id){
      $http.get('/api/post/' + id).then(function(res){
        $scope.updatePostData = res.data;
        $scope.isShowUpdatePost=true;
        $scope.isShowPostsTable=false;
      });
    };

    $scope.createPost = function(){
      $http.post('/api/post/', $scope.newPost).then(function(data){
        window.location.reload();
      });
    };

    $scope.updatePost = function(id){
      $http.put('/api/post/'+ id, $scope.updatePostData).then(function (data) {
        window.location.reload();
      });
    };

    $scope.destroyPost = function(id){
      if(confirm("Are you sure to remove this post?")){
        $http.delete('/api/post/'+ id).then(function (data) {
          window.location.reload();
        })
      }
    };

  });



