app.controller("ListController",
  ["List", "Item", "$scope", "$state", "$stateParams", "list", "items", "$stamplay", "Pubnub",
    function(List, Item, $scope, $state, $stateParams, list, items, $stamplay, Pubnub) {

      $scope.list = list;
      $scope.items = items;
      var slug = $stateParams.slug;

      $scope.add = function(name) {
        Item.add(name, slug)
          .then(function(res) {
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

      //
      Pubnub.subscribe({
          channel  :$stateParams.slug,
          message  : function(msg) {
            if(msg.item.new) {
              $scope.items.push(msg.item);
              $scope.$apply();
            } else {
              var items_copy = angular.copy($scope.items);
              items_copy.find(function(item, index, array) {
                if(item._id === msg.item._id) {
                  $scope.items[index].complete = msg.item.complete;
                  $scope.$apply();
                  return;
                }
              })
            }
          }
      });



}])
