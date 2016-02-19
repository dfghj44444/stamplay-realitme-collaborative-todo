var app = angular.module("shop-with-me", ["ui.router", "pubnub.angular.service", "ngStamplay"])

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state("Home", {
        url : '/',
        templateUrl : "../../views/home.html"
    })
    .state("Account", {
        url : '/account',
        templateUrl : "../../views/account.html",
        controller : "AccountController"
    })

  $urlRouterProvider.otherwise("/");

  $locationProvider.html5Mode(true);
})

app.run(function(Pubnub, User, $rootScope) {
  Stamplay.init("shop-with-me")
  Pubnub.init({
    publish_key : "pub-c-3038b9d4-b26c-46f4-aac7-aefbd5dadc33",
    subscribe_key : "sub-c-5deb1b3a-cac3-11e5-a316-0619f8945a4f"
  })
  User.current()
    .then(
      function(response) {
        $rootScope.user = response.user;
      }
    )
})
