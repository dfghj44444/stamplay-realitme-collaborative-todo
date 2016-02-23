app.factory("List", ["$http", "$q", "$stamplay", function($http, $q, $stamplay) {

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
    },

    getList : function(slug) {
      var deffered = $q.defer();

      $stamplay.Object("list")
        .get({ slug : slug })
          .then(function(res) {
            deffered.resolve(res.data[0]);
          }, function(err) {
            deffered.reject(err.message)
          })

      return deffered.promise;
    },

    inviteUser : function(invitee, current) {
      var deffered = $q.defer();

      var data = {
        "to": invitee,
        "from": current,
        "fromname": current,
        "subject": "You have been invited to shop with me!",
        "body": "Collaborate with me in realtime on my shopping list at " + window.location.href
      };

      Stamplay.Webhook('invite')
        .post(data)
          .then(function(res) {
            deffered.resolve(res);
          }, function(err){
            deffered.reject(err);
          });
          return deffered.promise;
      }

  }

}])
