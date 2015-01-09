app.controller "SightsCtrl", ($scope, $state, $http, $q) ->
  $scope.load = true
  onSuccess = (position) ->
    lat = position.coords.latitude
    long = position.coords.longitude

    $scope.getEvents(lat, long).then (res) ->
      $scope.load = false
      $scope.places = res.response.groups[0].items
      console.log $scope.places


  $scope.getEvents = (lat, long) ->
    defer = $q.defer()
    $http.get("https://api.foursquare.com/v2/venues/explore?client_id=5AVYENTNQPB3RUUTJOG0WWI5IZ3H1FK32U1UUR4PLAKL3LMY&client_secret=3YTBGJ5RZC5RRPCTA4YKVWKYL5EZW2TKO0SYJ4JTMT3YWKPZ&v=20130815%20&ll="+lat+","+long+"&section=sights"
    ).success (res) ->
      defer.resolve res

    defer.promise

  navigator.geolocation.getCurrentPosition onSuccess


app.controller "SightCtrl", ($scope, $stateParams, $http, $q) ->
  console.log "here i am"


  $scope.init = ->
    $scope.getEvents().then (res) ->
      $scope.place = res.response.venue
      $scope.prefix = $scope.place.photos.groups[0].items[3].prefix+"width"
      $scope.width = $scope.place.photos.groups[0].items[3].width
      $scope.suffix = $scope.place.photos.groups[0].items[3].suffix
      $scope.pic = $scope.prefix + $scope.width + $scope.suffix

      console.log $scope.place

      $scope.title =  $scope.place.name
      $scope.des = $scope.place.description

      $scope.add = $scope.place.location.address
      $scope.lat = $scope.place.location.lat
      $scope.long = $scope.place.location.lng



  $scope.getEvents = ->
    defer = $q.defer()
    $http.jsonp("https://api.foursquare.com/v2/venues/"+$stateParams.placeId+"?client_id=5AVYENTNQPB3RUUTJOG0WWI5IZ3H1FK32U1UUR4PLAKL3LMY&client_secret=3YTBGJ5RZC5RRPCTA4YKVWKYL5EZW2TKO0SYJ4JTMT3YWKPZ&v=20130815%20&callback=JSON_CALLBACK"
    ).success (res) ->
      defer.resolve res

    defer.promise

  $scope.init()