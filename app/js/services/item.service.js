app.factory("Item", ["$q", "$stamplay", function($q, $stamplay) {

  return {

    add : function(name, list) {
      var deffered = $q.defer();
      $stamplay.Object("item")
        .save({ name : name, list : list, complete : false })
          .then(function(res) {
            deffered.resolve(res);
          }, function(err) {
            deffered.reject(err.message)
          })
      return deffered.promise;
    },

    complete : function(item) {
      var deffered = $q.defer();
      $stamplay.Object("item")
        .patch(item._id, { complete : !item.complete })
          .then(function(res) {
            deffered.resolve(res);
          }, function(err) {
            deffered.reject(err.message)
          })
      return deffered.promise;
    },

    getListItems : function(list) {
      var deffered = $q.defer();
      $stamplay.Object("item")
        .get({ list : list, page: 1, per_page: 500 })
          .then(function(res) {
            deffered.resolve(res.data);
          }, function(err) {
            deffered.reject(err.message)
          })
      return deffered.promise;
    }

  }

}])
