UserFactories = angular.module("UserFactories", [])

UserFactories.factory('User', ['$http', ($http)->
  return {

    post: (newUser)->
      # $http.post("http://arisan-api.herokuapp.com/users.json", {user: newUser})
      $http.post("https://ryan-users.herokuapp.com/users.json", {user: newUser})

  }
])