app.controller("ListController",
  ["List", "Item", "$scope", "$rootScope", "$state", "$stateParams", "list", "items", "$stamplay", "Pubnub", "ngNotify", "loggedin",
    function(List, Item, $scope, $rootScope, $state, $stateParams, list, items, $stamplay, Pubnub, ngNotify, loggedin) {

      var slug = $stateParams.slug;

      // New
      if(loggedin.user === false) {
        $state.go("Account", { tab : "login", list : slug });
        ngNotify.set("Please login to access this shopping list.")
      }

      $scope.list = list;
      $scope.items = items;

      $scope.add = function(name) {
        Item.add(name, slug)
          .then(function(res) {
            // New
            $scope.name = "";
          }, function(err) {
            console.error(err);
          })
      }

      $scope.complete = function(item, idx) {
        Item.complete(item)
          .then(function(res) {
            $scope.items[idx] = res;
          }, function(err) {
            console.error(err);
          })
      }

      $scope.invite = function(invitee) {
        List.inviteUser(invitee, loggedin.user.email, slug)
          .then(function(response) {
            ngNotify.set("You invited " + invitee + " to collaborate.")
          }, function(err) {
            ngNotify.set("Umm something's not right..")
          })
      }

      // New
      Pubnub.subscribe({
          channel  : slug,
          message  : function(msg) {
            if(msg.item.new) {

              $scope.items.push(msg.item);
              $scope.$apply();

              if(msg.user._id !== loggedin.user._id) {
                ngNotify.set(msg.user.email + " added the item, " + msg.item.name  + " to this shopping list.")
              }

            } else {

              var items_copy = angular.copy($scope.items);
              items_copy.find(function(item, index, array) {

                if(item._id === msg.item._id) {

                  $scope.items[index].complete = msg.item.complete;
                  $scope.$apply();

                  if(msg.user._id !== loggedin.user._id) {
                    var user = msg.user.email;
                    var action = msg.item.complete ? " checked off " : " unchecked ";
                    ngNotify.set(user + " " + action + " " + items_copy[index].name + " " + " on the " + list.name + " shopping list.")
                  }

                  return;
                }

              })
            }
          }
      });



}])
