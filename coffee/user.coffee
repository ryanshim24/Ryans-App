app.controller "UsersCtrl", ["$scope", "$http", '$stateParams', '$state', '$location', '$rootScope', 'User', ($scope, $http, $stateParams, $state, $location, $rootScope, User)->
  $scope.newUser = {}

  $scope.createUser = ->
    console.log $scope.newUser
    User.post($scope.newUser).success (data)->
      console.log data
      $rootScope.current_user = data
      $state.go('app.todo')

]


app.controller "SessionsCtrl", ["$scope", "$http", "$rootScope", "$location", '$state', ($scope, $http, $rootScope, $location, $state)->
  $scope.addSession = (loginUser)->
    console.log (loginUser)
    $http.post("https://ryan-users.herokuapp.com/login.json", {user: loginUser}).success (user)->
        $rootScope.current_user = user
        $state.go('app.todo')

]


