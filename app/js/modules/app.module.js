var app = angular.module("shop-with-me", ["ui.router", "pubnub.angular.service"])

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state("Home", {
        url : '/',
        templateUrl : "../../views/home.html"
    })

  $urlRouterProvider.otherwise("/");

  $locationProvider.html5Mode(true);
})

app.run(function() {
  Stamplay.init("YOUR STAMPLAY APP ID")
  Pubnub.init({
    publish_key : "PUBNUB PUBLISH KEY",
    subscribe_key : "PUBNUB SUBSCRIBE KEY"
  })
})
