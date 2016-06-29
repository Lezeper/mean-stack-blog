(function () {

  angular.module('meanApp')
    .service('meanData', ['$http', 'authentication', function meanData($http, authentication) {

      var getProfile = function () {
        return $http.get('/api/profile', {
          headers: {
            Authorization: 'Bearer ' + authentication.getToken()
          }
        });
      };

      var getAllPosts = function () {
        return $http.get('/api/post')
      };

      var getPostsByKeyword = function (keyword) {
        return $http.get('/api/post/keyword/' + keyword)
      };

      var getPostById = function (id) {
        return $http.get('/api/post/id/' + id)
      };

      var getPostsByCategory = function (category) {
        return $http.get('/api/post/category/' + category);
      };

      var getPostsByTag = function (tag) {
        return $http.get('/api/post/tag/' + tag);
      };

      var listCategory = function () {
        return $http.get('/api/post/category');
      };

      var listTag = function () {
        return $http.get('/api/post/tag');
      };

      var createPost = function (newPost) {
        return $http.post('/api/post/', newPost, {
          headers: {
            Authorization: 'Bearer ' + authentication.getToken()
          }
        });
      };

      var updatePost = function (id, updatePostData) {
        return $http.put('/api/post/id/' + id, updatePostData, {
          headers: {
            Authorization: 'Bearer ' + authentication.getToken()
          }
        })
      };

      var destroyPost = function (id) {
        return $http.delete('/api/post/id/' + id, {
          headers: {
            Authorization: 'Bearer ' + authentication.getToken()
          }
        })
      };

      var getAllLogs =function () {
        return $http.get('/api/log', {
          headers: {
            Authorization: 'Bearer ' + authentication.getToken()
          }
        })
      };

      var clearAllLogs = function () {
        return $http.delete('/api/log', {
          headers: {
            Authorization: 'Bearer ' + authentication.getToken()
          }
        })
      };

      return {
        getProfile: getProfile,
        getAllPosts: getAllPosts,
        getPostsByKeyword: getPostsByKeyword,
        getPostById: getPostById,
        createPost: createPost,
        updatePost: updatePost,
        destroyPost: destroyPost,
        listCategory: listCategory,
        listTag: listTag,
        getPostsByCategory: getPostsByCategory,
        getPostsByTag: getPostsByTag,
        getAllLogs: getAllLogs,
        clearAllLogs: clearAllLogs
      };
    }]);

})();