app.factory("List", ["$q", "$stamplay", function($q, $stamplay) {

  return {

    createList : function(name) {
      var deffered = $q.defer();

      var slug = name.toLowerCase().split(" ").join("-");

      $stamplay.Object("list")
        .save({ slug : slug, name : name })
          .then(function(res) {
            deffered.resolve(res);
          }, function(err) {
            deffered.reject(err.message)
          })

      return deffered.promise;
    },

    checkName : function(name) {
      var deffered = $q.defer();

      var slug = name.toLowerCase().split(" ").join("-");

      $stamplay.Object("list")
        .get({ slug : slug })
          .then(function(res) {
            deffered.resolve({ data : res.data.length, slug : slug });
          }, function(err) {
            deffered.reject(err.message)
          })

      return deffered.promise;
    }

  }

}])
