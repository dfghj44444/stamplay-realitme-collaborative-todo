app.controller("ListController",
  ["List", "Item", "$scope", "$state", "$stateParams", "list", "items", "$stamplay",
    function(List, Item, $scope, $state, $stateParams, list, items, $stamplay) {

      $scope.list = list;
      $scope.items = items;
      var slug = $stateParams.slug;

      $scope.add = function(name) {
        Item.add(name, slug)
          .then(function(res) {
            $scope.items.push(res);
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


}])
