app.controller "MoviesCtrl", ($scope, $state, $http, $q) ->
  $scope.load = true

  onSuccess = (position) ->
    lat = position.coords.latitude
    long = position.coords.longitude
    $scope.date = new Date()
    $scope.curr = $scope.date.getDate()
    $scope.month = $scope.date.getMonth() + 1
    $scope.year = $scope.date.getFullYear()
    $scope.now = $scope.year + "-"+$scope.month+"-"+$scope.curr
    date = $scope.now
    $scope.getEvents(date, lat, long).then (res) ->
      $scope.load = false
      $scope.movies = res
      console.log $scope.movies



  $scope.getEvents = (date, lat, long)->
    defer = $q.defer()
    $http.get("http://data.tmsapi.com/v1/movies/showings?startDate="+date+"&lat="+lat+"&lng="+long+"&api_key=pjp3whej4cfqk4gv4c3fxzun"
    ).success (res) ->
      defer.resolve res

    defer.promise

  navigator.geolocation.getCurrentPosition onSuccess
