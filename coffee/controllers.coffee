app.controller "AppCtrl", ($scope, $ionicModal, $timeout, $http, $rootScope, $state) ->
  $scope.logout = ->
    console.log $rootScope
    $http.delete("https://ryan-users.herokuapp.com/sessions/#{$rootScope.current_user.id}.json").success (data) ->
      $state.go('main')



app.controller "PlaylistsCtrl", ($scope) ->
  $scope.test = 123
  $scope.playlists = [
    {
      title: "Reggae"
      id: 1
    }
    {
      title: "Chill"
      id: 2
    }
    {
      title: "Dubstep"
      id: 3
    }
    {
      title: "Indie"
      id: 4
    }
    {
      title: "Rap"
      id: 5
    }
    {
      title: "Cowbell"
      id: 6
    }
  ]

app.controller "PlaylistCtrl", ($scope, $stateParams) ->



