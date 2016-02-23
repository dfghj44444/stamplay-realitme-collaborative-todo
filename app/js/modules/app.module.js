var app = angular.module("shop-with-me", ["ui.router", "ngNotify", "pubnub.angular.service", "ngStamplay", "ngSanitize"])

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state("Home", {
        url : '/',
        templateUrl : "../../views/home.html",
        controller: "HomeController",
        resolve : {
          loggedin : function(User) {
            return User.current();
          }
        }
    })
    .state("Account", {
        url : '/account/:tab?list',
        templateUrl : "../../views/account.html",
        controller : "AccountController",
    })
    .state("List", {
      url : "/list/:slug",
      templateUrl : '../../views/list.html',
      controller : "ListController",
      resolve : {
        loggedin : function(User) {
          return User.current();
        },
        list : function(List, $stateParams) {
          return List.getList($stateParams.slug);
        },
        items : function(Item, $stateParams) {
          return Item.getListItems($stateParams.slug);
        }
      }
    })

  $urlRouterProvider.otherwise("/");

  $locationProvider.html5Mode(true);

})

app.run(function(Pubnub, User, $rootScope, ngNotify) {

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

  //  New
  ngNotify.config({
    duration: 3000,
    type: 'info',
    html: true
  });

})
