app.controller "ConcertsCtrl", ($scope) ->
  $scope.concerts = [
    {
      title: "San Francisco"
      id: 1
    }
    {
      title: "Los Angeles"
      id: 2
    }
    {
      title: "San Diego"
      id: 3
    }
    {
      title: "Portland"
      id: 4
    }
    {
      title: "New York"
      id: 5
    }
    {
      title: "Las Vegas"
      id: 6
    }
  ]



app.controller "ConcertCtrl", ($scope, $state, $http, $q, $stateParams) ->
  num = $stateParams.concertId
  month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  $scope.date = new Date()
  $scope.month = $scope.date.getMonth()
  $scope.day = $scope.date.getDate()
  $scope.year = $scope.date.getFullYear()

  $scope.now = month[$scope.month]
  console.log $scope.now
  $scope.init = ->
    $scope.getEvents().then (res) ->
      console.log "This is the result: ", res
      $scope.events = res.resultsPage.results.event


  $scope.getEvents = ->
    if num = 1
      ipkey= "ip:208.113.83.165"

      defer = $q.defer()
      $http.get("http://api.songkick.com/api/3.0/events.json?apikey=z4nSxDMJEbSNuTKt&location="+ipkey+"&callback=JSON_CALLBACK"
      ).success (res) ->
        defer.resolve res

      defer.promise

    else if num = 2
      ipkey = "ip:134.201.250.155"
      defer = $q.defer()
      $http.get("http://api.songkick.com/api/3.0/events.json?apikey=z4nSxDMJEbSNuTKt&location="+ipkey+"&callback=JSON_CALLBACK"
      ).success (res) ->
        defer.resolve res

      defer.promise



  $scope.init()