app.controller("AccountController",
  ["User", "$scope", "$rootScope", "$state",
    function(User, $scope, $rootScope, $state) {

  var userStatus = function() {
    User.current()
      .then(function(response) {
          $rootScope.user = response.user;
          $state.go("Home");
        })
  };

  $scope.logout = function() {
    Stamplay.User.logout();
  };

  $scope.login = function() {
    User.login($scope.user)
      .then(function(user) {
          userStatus();
        })
  };

  $scope.signup = function() {
    User.signup($scope.user)
      .then(function(user) {
          userStatus();
        })
  };

}])
