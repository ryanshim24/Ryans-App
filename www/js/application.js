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
  }).state("app.dribble", {
    url: "/dribble",
    views: {
      menuContent: {
        templateUrl: "templates/dribble.html",
        controller: "DribbleCtrl"
      }
    }
  }).state("app.concerts", {
    url: "/concerts",
    views: {
      menuContent: {
        templateUrl: "templates/concert.html",
        controller: "ConcertCtrl"
      }
    }
  }).state("app.games", {
    url: "/games",
    views: {
      menuContent: {
        templateUrl: "templates/games.html",
        controller: "GamesCtrl"
      }
    }
  }).state("app.hangman", {
    url: "/games/hangman",
    views: {
      menuContent: {
        templateUrl: "templates/hangman.html",
        controller: "HangCtrl"
      }
    }
  }).state("app.tictac", {
    url: "/games/tictac",
    views: {
      menuContent: {
        templateUrl: "templates/tictac.html",
        controller: "TicCtrl"
      }
    }
  }).state("app.todo", {
    url: "/todo",
    views: {
      menuContent: {
        templateUrl: "templates/todo.html",
        controller: "ToDoCtrl"
      }
    }
  }).state("app.foods", {
    url: "/food",
    views: {
      menuContent: {
        templateUrl: "templates/foods.html",
        controller: "FoodsCtrl"
      }
    }
  }).state("app.food", {
    url: "/food/:foodlistId",
    views: {
      menuContent: {
        templateUrl: "templates/food.html",
        controller: "FoodCtrl"
      }
    }
  }).state("app.places", {
    url: "/places",
    views: {
      menuContent: {
        templateUrl: "templates/places.html",
        controller: "PlacesCtrl"
      }
    }
  }).state("app.place", {
    url: "/places/:placeId",
    views: {
      menuContent: {
        templateUrl: "templates/place.html",
        controller: "PlaceCtrl"
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

app.controller("AppCtrl", function($scope, $ionicModal, $timeout) {});

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

app.controller("DribbleCtrl", function($scope, $state, $http, $q) {
  var count;
  $scope.imageList = [];
  count = 0;
  $scope.init = function() {
    return $scope.getImages().then((function(res) {
      console.log("Images:", res.shots);
      $scope.imageList = $scope.imageList.concat(res.shots);
      console.log($scope.imageList);
      return $scope.$broadcast('scroll.infiniteScrollComplete');
    }), function(status) {
      return $scope.pageError = status;
    });
  };
  $scope.getImages = function() {
    var defer;
    count++;
    defer = $q.defer();
    $http.jsonp("http://api.dribbble.com/shots/everyone?&page=" + count + "&per_page=5&callback=JSON_CALLBACK").success(function(res) {
      return defer.resolve(res);
    }).error(function(status, err) {
      return defer.reject(status);
    });
    return defer.promise;
  };
  return $scope.init();
});

app.filter("time", function() {
  return function(input) {
    var time;
    time = input.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice(1);
      time[5] = (time[0] < 12 ? " AM" : " PM");
      time[0] = time[0] % 12 || 12;
    }
    time.splice(3, 1);
    return time.join("");
  };
});

app.filter("winnerArrow", function() {
  return function(input) {
    if (input === "X") {
      return "← X";
    } else if (input === "O") {
      return "O →";
    } else {
      return input;
    }
  };
});

app.controller("FoodsCtrl", function($scope, $state, $http, $q) {
  $scope.init = function() {
    return $scope.getEvents().then(function(res) {
      $scope.places = res.response.groups[0].items;
      return console.log($scope.places);
    });
  };
  $scope.getEvents = function() {
    var defer;
    defer = $q.defer();
    $http.get("https://api.foursquare.com/v2/venues/explore?client_id=5AVYENTNQPB3RUUTJOG0WWI5IZ3H1FK32U1UUR4PLAKL3LMY&client_secret=3YTBGJ5RZC5RRPCTA4YKVWKYL5EZW2TKO0SYJ4JTMT3YWKPZ&v=20130815%20&near=San%20Francisco,%20CA&section=food").success(function(res) {
      return defer.resolve(res);
    });
    return defer.promise;
  };
  return $scope.init();
});

app.controller("FoodCtrl", function($scope, $stateParams, $http, $q) {
  console.log("here i am");
  $scope.init = function() {
    return $scope.getEvents().then(function(res) {
      $scope.place = res.response.venue;
      $scope.prefix = $scope.place.photos.groups[0].items[1].prefix + "width";
      $scope.width = $scope.place.photos.groups[0].items[1].width;
      $scope.suffix = $scope.place.photos.groups[0].items[1].suffix;
      $scope.pic = $scope.prefix + $scope.width + $scope.suffix;
      console.log($scope.place);
      $scope.title = $scope.place.name;
      $scope.des = $scope.place.description;
      $scope.add = $scope.place.location.address;
      $scope.price = $scope.place.attributes.groups[0].items[0].displayValue;
      return $scope.phone = $scope.place.contact.formattedPhone;
    });
  };
  $scope.getEvents = function() {
    var defer;
    defer = $q.defer();
    $http.jsonp("https://api.foursquare.com/v2/venues/" + $stateParams.foodlistId + "?client_id=5AVYENTNQPB3RUUTJOG0WWI5IZ3H1FK32U1UUR4PLAKL3LMY&client_secret=3YTBGJ5RZC5RRPCTA4YKVWKYL5EZW2TKO0SYJ4JTMT3YWKPZ&v=20130815%20&callback=JSON_CALLBACK").success(function(res) {
      return defer.resolve(res);
    });
    return defer.promise;
  };
  return $scope.init();
});

app.controller("GamesCtrl", function($scope) {});

app.controller("HangCtrl", function($scope) {
  $scope.letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  $scope.points = 0;
  $scope.newGame = function(providedWord) {
    $scope.intro = true;
    $scope.game = true;
    $scope.word = [];
    providedWord.split("").forEach(function(letter) {
      return $scope.word.push({
        name: letter,
        guessed: false
      });
    });
    $scope.points = 0;
    return $scope.gameLetters = $scope.letters.slice();
  };
  return $scope.check = function(guess) {
    var correct;
    $scope.gameLetters.splice($scope.gameLetters.indexOf(guess), 1);
    correct = false;
    $scope.word.forEach(function(letter) {
      if (letter.name === guess) {
        letter.guessed = true;
        return correct = true;
      }
    });
    if (!correct) {
      $scope.points++;
      if ($scope.points === 6) {
        $scope.status = "Sorry, You Lose";
        $scope.game = false;
        $scope.victory = true;
      }
    }
    return $scope.word.forEach(letter)(function() {
      if (letter.gussed === true) {
        $scope.status = "Congrats!, You won!";
        $scope.game = false;
        $scope.victory = true;
      }
      return $scope.guess = "";
    });
  };
});

app.controller("TicCtrl", function($scope) {
  $scope.board = new TicTacToeBoard();
  $scope.currentPlayer = "X";
  $scope.nextPlayer = "O";
  $scope.player = $scope.player || {
    X: "",
    O: ""
  };
  $scope.cellClick = function(x, y) {
    var temp, winner;
    if ($scope.board.isGameOver()) {
      return;
    }
    if ($scope.board.getCell(x, y) === "") {
      $scope.board.setCell(x, y, $scope.currentPlayer);
      temp = $scope.currentPlayer;
      $scope.currentPlayer = $scope.nextPlayer;
      $scope.nextPlayer = temp;
    }
    if ($scope.board.isGameOver()) {
      if ($scope.board.isTie()) {
        $scope.status = "Tie game!";
        return GameHistory.push({
          player: {
            X: $scope.player.X,
            O: $scope.player.O
          },
          winner: "Tie"
        });
      } else {
        winner = $scope.board.getWinner();
        $scope.status = ($scope.player[winner] || winner) + " won!";
        return GameHistory.push({
          player: {
            X: $scope.player.X,
            O: $scope.player.O
          },
          winner: winner
        });
      }
    }
  };
  return $scope.newGame = function() {
    return $scope.board.reset();
  };
});

app.controller("ConcertsCtrl", function($scope) {
  return $scope.concerts = [
    {
      title: "San Francisco",
      id: 1
    }, {
      title: "Los Angeles",
      id: 2
    }, {
      title: "San Diego",
      id: 3
    }, {
      title: "Portland",
      id: 4
    }, {
      title: "New York",
      id: 5
    }, {
      title: "Las Vegas",
      id: 6
    }
  ];
});

app.controller("ConcertCtrl", function($scope, $state, $http, $q, $stateParams) {
  var num;
  num = $stateParams.concertId;
  $scope.init = function() {
    return $scope.getEvents().then(function(res) {
      console.log("This is the result: ", res);
      return $scope.events = res.resultsPage.results.event;
    });
  };
  $scope.getEvents = function() {
    var defer, ipkey;
    if (num = 1) {
      ipkey = "ip:208.113.83.165";
      defer = $q.defer();
      $http.get("http://api.songkick.com/api/3.0/events.json?apikey=z4nSxDMJEbSNuTKt&location=" + ipkey + "&callback=JSON_CALLBACK").success(function(res) {
        return defer.resolve(res);
      });
      return defer.promise;
    } else if (num = 2) {
      ipkey = "ip:134.201.250.155";
      defer = $q.defer();
      $http.get("http://api.songkick.com/api/3.0/events.json?apikey=z4nSxDMJEbSNuTKt&location=" + ipkey + "&callback=JSON_CALLBACK").success(function(res) {
        return defer.resolve(res);
      });
      return defer.promise;
    }
  };
  return $scope.init();
});

app.controller("PlacesCtrl", function($scope, $state, $http, $q) {
  $scope.init = function() {
    return $scope.getEvents().then(function(res) {
      $scope.places = res.response.groups[0].items;
      return console.log($scope.places);
    });
  };
  $scope.getEvents = function() {
    var defer;
    defer = $q.defer();
    $http.get("https://api.foursquare.com/v2/venues/explore?client_id=5AVYENTNQPB3RUUTJOG0WWI5IZ3H1FK32U1UUR4PLAKL3LMY&client_secret=3YTBGJ5RZC5RRPCTA4YKVWKYL5EZW2TKO0SYJ4JTMT3YWKPZ&v=20130815%20&near=San%20Francisco,%20CA&section=outdoors").success(function(res) {
      return defer.resolve(res);
    });
    return defer.promise;
  };
  return $scope.init();
});

app.controller("PlaceCtrl", function($scope, $stateParams, $http, $q) {
  console.log("here i am");
  $scope.init = function() {
    return $scope.getEvents().then(function(res) {
      $scope.place = res.response.venue;
      $scope.prefix = $scope.place.photos.groups[0].items[1].prefix + "width";
      $scope.width = $scope.place.photos.groups[0].items[1].width;
      $scope.suffix = $scope.place.photos.groups[0].items[1].suffix;
      $scope.pic = $scope.prefix + $scope.width + $scope.suffix;
      console.log($scope.place);
      $scope.title = $scope.place.name;
      $scope.des = $scope.place.description;
      return $scope.add = $scope.place.location.address;
    });
  };
  $scope.getEvents = function() {
    var defer;
    defer = $q.defer();
    $http.jsonp("https://api.foursquare.com/v2/venues/" + $stateParams.placeId + "?client_id=5AVYENTNQPB3RUUTJOG0WWI5IZ3H1FK32U1UUR4PLAKL3LMY&client_secret=3YTBGJ5RZC5RRPCTA4YKVWKYL5EZW2TKO0SYJ4JTMT3YWKPZ&v=20130815%20&callback=JSON_CALLBACK").success(function(res) {
      return defer.resolve(res);
    });
    return defer.promise;
  };
  return $scope.init();
});

app.controller("ToDoCtrl", function($scope, $ionicModal) {
  $scope.tasks = [
    {
      title: 'Collect coins'
    }, {
      title: 'Eat mushrooms'
    }, {
      title: 'Get high enough to grab the flag'
    }, {
      title: 'Find the Princess'
    }
  ];
  $scope.deleteTask = function(task) {
    var index;
    index = $scope.tasks.indexOf(task);
    return $scope.tasks.splice(index, 1);
  };
  $ionicModal.fromTemplateUrl("new-task.html", (function(modal) {
    return $scope.taskModal = modal;
  }), {
    scope: $scope,
    animation: "slide-in-up"
  });
  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title
    });
    console.log($scope.tasks);
    $scope.taskModal.hide();
    return task.title = "";
  };
  $scope.newTask = function() {
    return $scope.taskModal.show();
  };
  return $scope.closeNewTask = function() {
    return $scope.taskModal.hide();
  };
});
