var app = angular.module("shop-with-me", ["ui.router", "ngNotify", "pubnub.angular.service", "ngStamplay", "ngSanitize"])

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state("Home", {
        url : '/',
        templateUrl : "../../views/home.html"
    })

  $urlRouterProvider.otherwise("/");

  $locationProvider.html5Mode(true);
})

app.run(function(Pubnub, ngNotify) {
  Stamplay.init("YOUR STAMPLAY APP ID")
  Pubnub.init({
    publish_key : "PUBNUB PUBLISH KEY",
    subscribe_key : "PUBNUB SUBSCRIBE KEY",
    ssl : (('https:' === window.location.protocol) ? true : false)
  })

  ngNotify.config({
    duration: 3000,
    type: 'info',
    html: true
  });
})
