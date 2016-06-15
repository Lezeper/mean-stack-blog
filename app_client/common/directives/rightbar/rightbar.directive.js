(function () {

  angular.module('meanApp')
    .directive('rightbar', rightbar);

  function rightbar() {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/rightbar/rightbar.template.html',
      controller: 'rightbarCtrl'
    };
  }

})();
