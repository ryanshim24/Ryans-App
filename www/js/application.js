var app;

app = angular.module("starter", ["ionic"]).run(function($ionicPlatform) {
  return $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      return StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state("app", {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: "AppCtrl"
  }).state("app.search", {
    url: "/search",
    views: {
      menuContent: {
        templateUrl: "templates/search.html"
      }
    }
  }).state("app.browse", {
    url: "/browse",
    views: {
      menuContent: {
        templateUrl: "templates/browse.html",
        controller: "BrowseCtrl"
      }
    }
  }).state("app.playlists", {
    url: "/playlists",
    views: {
      menuContent: {
        templateUrl: "templates/playlists.html",
        controller: "PlaylistsCtrl"
      }
    }
  }).state("app.single", {
    url: "/playlists/:playlistId",
    views: {
      menuContent: {
        templateUrl: "templates/playlist.html",
        controller: "PlaylistCtrl"
      }
    }
  });
  return $urlRouterProvider.otherwise("/app/playlists");
});

app.controller("AppCtrl", function($scope, $ionicModal, $timeout) {
  $scope.loginData = {};
  $ionicModal.fromTemplateUrl("templates/login.html", {
    scope: $scope
  }).then(function(modal) {
    return $scope.modal = modal;
  });
  $scope.closeLogin = function() {
    return $scope.modal.hide();
  };
  $scope.login = function() {
    return $scope.modal.show();
  };
  return $scope.doLogin = function() {
    console.log("Doing login", $scope.loginData);
    return $timeout((function() {
      return $scope.closeLogin();
    }), 1000);
  };
});

app.controller("PlaylistsCtrl", function($scope) {
  $scope.test = 123;
  return $scope.playlists = [
    {
      title: "Reggae",
      id: 1
    }, {
      title: "Chill",
      id: 2
    }, {
      title: "Dubstep",
      id: 3
    }, {
      title: "Indie",
      id: 4
    }, {
      title: "Rap",
      id: 5
    }, {
      title: "Cowbell",
      id: 6
    }
  ];
});

app.controller("PlaylistCtrl", function($scope, $stateParams) {});

app.controller("BrowseCtrl", function($scope, $state, $http, $q) {
  $scope.init = function() {
    return $scope.getImages().then((function(res) {
      console.log("Images:", res);
      $scope.imageList = res.shots;
      return console.log($scope.imageList);
    }), function(status) {
      return $scope.pageError = status;
    });
  };
  $scope.getImages = function() {
    var defer;
    defer = $q.defer();
    $http.jsonp("http://api.dribbble.com/shots/everyone?&per_page=20&callback=JSON_CALLBACK").success(function(res) {
      return defer.resolve(res);
    }).error(function(status, err) {
      return defer.reject(status);
    });
    return defer.promise;
  };
  return $scope.init();
});
