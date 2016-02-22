app.controller("AccountController",
  ["User", "$scope", "$rootScope", "$state", "$stateParams", "$location",
    function(User, $scope, $rootScope, $state, $stateParams, $location) {

  if($stateParams.tab) {
    $scope.tab = $stateParams.tab === 'signup' ? 'signup' : 'login';
  }

  var userStatus = function() {
    User.current()
      .then(function(response) {
          $rootScope.user = response.user;
          if($location.search().list) {
            $state.go("List", { slug : $location.search().list });
          } else {
            $state.go("Home");
          }
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
