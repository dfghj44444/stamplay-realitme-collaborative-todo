app.factory("User", ["$q", "$stamplay", function($q, $stamplay) {
  return {
    login : function(credentials) {
      var deffered = $q.defer();
      $stamplay.User.login(credentials)
        .then(
          function(response) {
            deffered.resolve(response);
          }, function(error) {
            deffered.reject(error);
          }
        )
      return deffered.promise;
    },
    signup : function(credentials) {
      var deffered = $q.defer();
      $stamplay.User.signup(credentials)
        .then(
          function(response) {
            deffered.resolve(response);
          }, function(error) {
            deffered.reject(error);
          }
        )
      return deffered.promise;
    },
    current : function() {
      var deffered = $q.defer();
      $stamplay.User.currentUser()
        .then(
          function(response) {
            if(!response.hasOwnProperty("user")) response.user = false;
            deffered.resolve(response);
          }, function(error) {
            deffered.reject(error);
          }
        )
      return deffered.promise;
    }
  }
}])
