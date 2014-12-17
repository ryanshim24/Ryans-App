app.controller "MoviesCtrl", ($scope, $state, $http, $q) ->
  $scope.init = ->
    $scope.date = new Date()
    $scope.curr = $scope.date.getDate()
    $scope.month = $scope.date.getMonth() + 1
    console.log $scope.month
    $scope.year = $scope.date.getFullYear()
    $scope.now = $scope.year + "-"+$scope.month+"-"+$scope.curr
    date = $scope.now
    $scope.getEvents(date).then (res) ->
      $scope.movies = res
      console.log $scope.movies



  $scope.getEvents = (date)->
    defer = $q.defer()
    $http.get("http://data.tmsapi.com/v1/movies/showings?startDate="+date+"&zip=94104&api_key=pjp3whej4cfqk4gv4c3fxzun"
    ).success (res) ->
      defer.resolve res

    defer.promise

  $scope.init()
