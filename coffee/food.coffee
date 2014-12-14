app.controller "FoodsCtrl", ($scope, $state, $http, $q) ->
  $scope.init = ->
    $scope.getEvents().then (res) ->
      $scope.places = res.response.groups[0].items
      console.log $scope.places


  $scope.getEvents = ->
    defer = $q.defer()
    $http.get("https://api.foursquare.com/v2/venues/explore?client_id=5AVYENTNQPB3RUUTJOG0WWI5IZ3H1FK32U1UUR4PLAKL3LMY&client_secret=3YTBGJ5RZC5RRPCTA4YKVWKYL5EZW2TKO0SYJ4JTMT3YWKPZ&v=20130815%20&near=San%20Francisco,%20CA&section=food"
    ).success (res) ->
      defer.resolve res

    defer.promise

  $scope.init()






app.controller "FoodCtrl", ($scope, $stateParams, $http, $q) ->
  console.log "here i am"

  $scope.init = ->
    $scope.getEvents().then (res) ->
      $scope.place = res.response.venue
      $scope.prefix = $scope.place.photos.groups[0].items[1].prefix+"width"
      $scope.width = $scope.place.photos.groups[0].items[1].width
      $scope.suffix = $scope.place.photos.groups[0].items[1].suffix
      $scope.pic = $scope.prefix + $scope.width + $scope.suffix

      console.log $scope.place

      $scope.title =  $scope.place.name
      $scope.des = $scope.place.description

      $scope.add = $scope.place.location.address
      $scope.price= $scope.place.attributes.groups[0].items[0].displayValue
      $scope.phone = $scope.place.contact.formattedPhone



  $scope.getEvents = ->
    defer = $q.defer()
    $http.jsonp("https://api.foursquare.com/v2/venues/"+$stateParams.foodlistId+"?client_id=5AVYENTNQPB3RUUTJOG0WWI5IZ3H1FK32U1UUR4PLAKL3LMY&client_secret=3YTBGJ5RZC5RRPCTA4YKVWKYL5EZW2TKO0SYJ4JTMT3YWKPZ&v=20130815%20&callback=JSON_CALLBACK"
    ).success (res) ->
      defer.resolve res

    defer.promise

  $scope.init()