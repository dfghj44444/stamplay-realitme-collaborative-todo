app.controller("AccountController",
  ["User", "$scope", "$rootScope", "$state", "$stateParams",
    function(User, $scope, $rootScope, $state, $stateParams) {

  if($stateParams.tab) {
    $scope.tab = $stateParams.tab === 'signup' ? 'signup' : 'login';
  }

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
