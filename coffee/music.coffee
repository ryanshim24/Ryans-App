

app.controller "ConcertCtrl", ($scope, $state, $http, $q, $stateParams) ->
  month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  $scope.date = new Date()
  $scope.month = $scope.date.getMonth()
  $scope.day = $scope.date.getDate()
  $scope.year = $scope.date.getFullYear()

  $scope.now = month[$scope.month]

  onSuccess = (position) ->
    lat = position.coords.latitude
    long = position.coords.longitude
    $scope.getEvents(lat, long).then (res) ->
      $scope.events = res.resultsPage.results.event
      $scope.eventss = []
      i = 0
      while i < $scope.events.length
        $scope.eventss.push($scope.events[i]) if $scope.events[i].venue.displayName isnt "Unknown venue" and $scope.events[i].performance.length isnt 0
        i++
      console.log $scope.eventss



  $scope.getEvents = (lat, long)->
    defer = $q.defer()
    $http.get("http://api.songkick.com/api/3.0/events.json?apikey=z4nSxDMJEbSNuTKt&location=geo:"+lat+","+long+"&callback=JSON_CALLBACK"
    ).success (res) ->
      defer.resolve res

    defer.promise

  navigator.geolocation.getCurrentPosition onSuccess