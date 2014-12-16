app.controller "DribbleCtrl", ($scope, $state, $http, $q) ->
  $scope.imageList = []
  count = 0
  $scope.init = ->
    $scope.getImages().then ((res) ->
     #success
      console.log "Images:", res.shots
      $scope.imageList = $scope.imageList.concat(res.shots)
      console.log $scope.imageList
      $scope.$broadcast('scroll.infiniteScrollComplete')
    ), (status) ->
      #err
      # console.log('Error:', status);
      $scope.pageError = status


  $scope.getImages = ->
    count++
    defer = $q.defer()
    $http.jsonp("http://api.dribbble.com/shots/everyone?&page="+count+"&per_page=5&callback=JSON_CALLBACK").success((res) ->
      defer.resolve res
    ).error (status, err) ->
      defer.reject status


    defer.promise

  $scope.init()

  $scope.goToLink = (url) ->
    $window.open(url, '_blank')

