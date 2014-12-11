app.controller "BrowseCtrl", ($scope, $state, $http, $q) ->
  $scope.init = ->
    $scope.getImages().then ((res) ->
     #success
      console.log "Images:", res
      $scope.imageList = res.shots
      console.log $scope.imageList
    ), (status) ->
      #err
      # console.log('Error:', status);
      $scope.pageError = status


  $scope.getImages = ->
    defer = $q.defer()
    $http.jsonp("http://api.dribbble.com/shots/everyone?&per_page=20&callback=JSON_CALLBACK").success((res) ->
      defer.resolve res
    ).error (status, err) ->
      defer.reject status


    defer.promise

  $scope.init()

