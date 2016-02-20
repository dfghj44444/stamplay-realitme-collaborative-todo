app.controller("HomeController",
  ["List", "$scope", "$state",
    function(List, $scope, $state) {

  // set initial loading state to false, input form in to valid, and availability to false
  $scope.searching = false;
  $scope.invalidName = true;
  $scope.availability = { status : false };

  // Create a new list
  $scope.createList = function() {

    $scope.availability.message = "Creating list..."

    List.createList($scope.list)
      .then(function(res) {
        // On creating the list notify success and change state to new list.
        $scope.availability = {
          status : "available",
          message : "Your shopping list, " + res.name + " has been created!"
        }
        $state.go("List", { slug : res.slug })
      }, function(err) {
        // If an error occurs show the err in the dialog
        $scope.availability = {
          status : "unavailable",
          message : err
        }
      })
  }

  // Check if the list name is taken
  $scope.checkName = function() {

    // Show loading indicator, set name as invalid, and availability false until searched complete
    $scope.searching = true;
    $scope.invalidName = true;
    $scope.availability = {
      status : 'checking',
      message : "Checking availability..."
    };

    /*  If the input is empty set these variables to hide
        the loading indicator, availability text, and disabled
        the form by setting invalid name to true.  */
    if($scope.list.length === 0) {
      $scope.availability.status = false;
      $scope.searching = false;
      $scope.invalidName = true;
      return false;
    }

    // Search if a name is already in use.
    List.checkName($scope.list)
      .then(function(res, slug) {

        // hide loading indicator
        $scope.searching = false;

        // If available, enable form and indicate that the name is available
        if(res.data === 0) {
          $scope.availability.status = "available"
          $scope.availability.message = "This name is available."
          $scope.invalidName = false;

        // Else do not enable form and indicate that it is not available
        } else {
          $scope.availability.status = "unavailable"
          $scope.availability.message = "This name is not available."
        }

      }, function(err) {
        $scope.searching = false;
        $scope.invalidName = true;
      })
  }

}])
