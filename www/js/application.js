var app;

app = angular.module("starter", ["ionic", "LocalForageModule", "UserFactories"]).run(function($ionicPlatform) {
  return $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      return StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state("main", {
    url: "/",
    templateUrl: "templates/main.html",
    controller: "UsersCtrl"
  }).state("signup", {
    url: "/signup",
    templateUrl: "templates/signup.html",
    controller: "UsersCtrl"
  }).state("login", {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: "SessionsCtrl"
  }).state("app", {
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
  }).state("app.foodplace", {
    url: "/foodie",
    views: {
      menuContent: {
        templateUrl: "templates/foodie.html",
        controller: "FoodieCtrl"
      }
    }
  }).state("app.foods", {
    url: "/foodie/:foodPlace",
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
  }).state("app.sights", {
    url: "/sights",
    views: {
      menuContent: {
        templateUrl: "templates/sights.html",
        controller: "SightsCtrl"
      }
    }
  }).state("app.sight", {
    url: "/sights/:sightId",
    views: {
      menuContent: {
        templateUrl: "templates/sight.html",
        controller: "SightCtrl"
      }
    }
  }).state("app.movies", {
    url: "/movies",
    views: {
      menuContent: {
        templateUrl: "templates/movies.html",
        controller: "MoviesCtrl"
      }
    }
  });
  return $urlRouterProvider.otherwise("/");
});

app.controller("AppCtrl", function($scope, $ionicModal, $timeout, $http, $rootScope, $state) {
  return $scope.logout = function() {
    console.log($rootScope);
    return $http["delete"]("https://ryan-users.herokuapp.com/sessions/" + $rootScope.current_user.id + ".json").success(function(data) {
      return $state.go('main');
    });
  };
});

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
  $scope.init();
  return $scope.goToLink = function(url) {
    return $window.open(url, '_blank');
  };
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

app.filter("movieTime", function() {
  return function(input) {
    var movieTime, time;
    time = input.split("");
    time = time.slice(11);
    time = time.join("");
    movieTime = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (movieTime.length > 1) {
      movieTime = movieTime.slice(1);
      movieTime[5] = (movieTime[0] < 12 ? " AM" : " PM");
      movieTime[0] = movieTime[0] % 12 || 12;
    }
    movieTime.splice(3, 1);
    return movieTime.join("");
  };
});

app.controller("FoodieCtrl", function($scope) {
  $scope.test = 123;
  return $scope.foodie = [
    {
      title: "Pizza"
    }, {
      title: "Sandwich"
    }, {
      title: "Ice Cream"
    }, {
      title: "Donut"
    }, {
      title: "Pasta"
    }, {
      title: "Ramen"
    }, {
      title: "Burrito"
    }, {
      title: "Salad"
    }
  ];
});

app.controller("FoodsCtrl", function($scope, $stateParams, $http, $q) {
  var onSuccess;
  console.log($stateParams.foodPlace);
  $scope.title = $stateParams.foodPlace;
  $scope.load = true;
  onSuccess = function(position) {
    var lat, long;
    lat = position.coords.latitude;
    long = position.coords.longitude;
    return $scope.getEvents(lat, long).then(function(res) {
      $scope.load = false;
      return $scope.places = res.response.groups[0].items;
    });
  };
  $scope.getEvents = function(lat, long) {
    var defer;
    defer = $q.defer();
    $http.get("https://api.foursquare.com/v2/venues/explore?client_id=5AVYENTNQPB3RUUTJOG0WWI5IZ3H1FK32U1UUR4PLAKL3LMY&client_secret=3YTBGJ5RZC5RRPCTA4YKVWKYL5EZW2TKO0SYJ4JTMT3YWKPZ&v=20130815%20&ll=" + lat + "," + long + "&query=" + $stateParams.foodPlace).success(function(res) {
      return defer.resolve(res);
    });
    return defer.promise;
  };
  return navigator.geolocation.getCurrentPosition(onSuccess);
});

app.controller("FoodCtrl", function($scope, $stateParams, $http, $q) {
  console.log("here i am");
  $scope.init = function() {
    return $scope.getEvents().then(function(res) {
      $scope.place = res.response.venue;
      $scope.prefix = $scope.place.photos.groups[0].items[3].prefix + "width";
      $scope.width = $scope.place.photos.groups[0].items[3].width;
      $scope.suffix = $scope.place.photos.groups[0].items[3].suffix;
      $scope.pic = $scope.prefix + $scope.width + $scope.suffix;
      console.log($scope.place);
      $scope.title = $scope.place.name;
      $scope.des = $scope.place.description;
      $scope.add = $scope.place.location.address;
      $scope.price = $scope.place.attributes.groups[0].items[0].displayValue;
      $scope.phone = $scope.place.contact.formattedPhone;
      $scope.lat = $scope.place.location.lat;
      return $scope.long = $scope.place.location.lng;
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

app.controller("HangCtrl", function($scope, $ionicModal) {
  console.log($scope.theWord);
  $ionicModal.fromTemplateUrl("hang-prompt.html", {
    scope: $scope,
    animation: "slide-in-up"
  }).then(function(modal) {
    $scope.modal = modal;
    return $scope.showTaskPrompt();
  });
  $ionicModal.fromTemplateUrl("win-prompt.html", {
    scope: $scope,
    animation: "slide-in-up"
  }).then(function(modal) {
    return $scope.fodal = modal;
  });
  $ionicModal.fromTemplateUrl("lose-prompt.html", {
    scope: $scope,
    animation: "slide-in-up"
  }).then(function(modal) {
    return $scope.lodal = modal;
  });
  $scope.showTaskPrompt = function() {
    return $scope.modal.show();
  };
  $scope.newGame = function(theWord) {
    var a, x, _results;
    x = document.getElementsByClassName("removeMe")[0];
    x.value = "";
    $scope.alph = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    $scope.modal.hide();
    $scope.game = true;
    $scope.counter = true;
    $scope.count = 0;
    $scope.savedWord = theWord.toLowerCase();
    $scope.letters = $scope.savedWord.split('');
    $scope.guess = [];
    $scope.spaces = [];
    $scope.hang = {};
    a = 0;
    _results = [];
    while (a < $scope.letters.length) {
      $scope.spaces.push("");
      _results.push(a += 1);
    }
    return _results;
  };
  $scope.checking = function(letter) {
    var checkSpace, i, j, right, _results;
    console.log(letter);
    this.clicked = true;
    right = false;
    i = 0;
    _results = [];
    while (i < $scope.letters.length) {
      if ($scope.letters[i] === letter) {
        $scope.guess[i] = letter;
        right = true;
        console.log($scope.guess);
        checkSpace = false;
        j = 0;
        while (j < $scope.guess.length) {
          if ($scope.guess[j] === void 0) {
            checkSpace = true;
          }
          j++;
        }
      }
      if ($scope.guess.length === $scope.letters.length && checkSpace === false) {
        console.log("here i am i win");
        $scope.fodal.show();
        $scope.alph = [];
      } else if (i === $scope.letters.length - 1 && right === false) {
        $scope.count += 1;
        $scope.hang[$scope.count] = true;
        if ($scope.count === 6) {
          console.log("here i am");
          $scope.lodal.show();
          $scope.alph = [];
        }
      }
      _results.push(i++);
    }
    return _results;
  };
  return $scope.playAgain = function() {
    console.log("here I am");
    $scope.fodal.hide();
    $scope.lodal.hide();
    return $scope.modal.show();
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
        return $scope.status = "Tie game!";
      } else {
        winner = $scope.board.getWinner();
        return $scope.status = ($scope.player[winner] || winner) + " won!";
      }
    }
  };
  return $scope.newGame = function() {
    return $scope.board.reset();
  };
});

app.controller("MoviesCtrl", function($scope, $state, $http, $q) {
  var onSuccess;
  $scope.load = true;
  onSuccess = function(position) {
    var date, lat, long;
    lat = position.coords.latitude;
    long = position.coords.longitude;
    $scope.date = new Date();
    $scope.curr = $scope.date.getDate();
    $scope.month = $scope.date.getMonth() + 1;
    $scope.year = $scope.date.getFullYear();
    $scope.now = $scope.year + "-" + $scope.month + "-" + $scope.curr;
    date = $scope.now;
    return $scope.getEvents(date, lat, long).then(function(res) {
      $scope.load = false;
      $scope.movies = res;
      return console.log($scope.movies);
    });
  };
  $scope.getEvents = function(date, lat, long) {
    var defer;
    defer = $q.defer();
    $http.get("http://data.tmsapi.com/v1/movies/showings?startDate=" + date + "&lat=" + lat + "&lng=" + long + "&api_key=pjp3whej4cfqk4gv4c3fxzun").success(function(res) {
      return defer.resolve(res);
    });
    return defer.promise;
  };
  return navigator.geolocation.getCurrentPosition(onSuccess);
});

app.controller("ConcertCtrl", function($scope, $state, $http, $q, $stateParams) {
  var month, onSuccess;
  $scope.load = true;
  month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $scope.date = new Date();
  $scope.month = $scope.date.getMonth();
  $scope.day = $scope.date.getDate();
  $scope.year = $scope.date.getFullYear();
  $scope.now = month[$scope.month];
  onSuccess = function(position) {
    var lat, long;
    lat = position.coords.latitude;
    long = position.coords.longitude;
    return $scope.getEvents(lat, long).then(function(res) {
      var i;
      $scope.events = res.resultsPage.results.event;
      $scope.eventss = [];
      i = 0;
      while (i < $scope.events.length) {
        if ($scope.events[i].venue.displayName !== "Unknown venue" && $scope.events[i].performance.length !== 0) {
          $scope.eventss.push($scope.events[i]);
        }
        i++;
      }
      console.log($scope.eventss);
      return $scope.load = false;
    });
  };
  $scope.getEvents = function(lat, long) {
    var defer;
    defer = $q.defer();
    $http.get("http://api.songkick.com/api/3.0/events.json?apikey=z4nSxDMJEbSNuTKt&location=geo:" + lat + "," + long + "&callback=JSON_CALLBACK").success(function(res) {
      return defer.resolve(res);
    });
    return defer.promise;
  };
  return navigator.geolocation.getCurrentPosition(onSuccess);
});

app.controller("PlacesCtrl", function($scope, $state, $http, $q) {
  var onSuccess;
  $scope.load = true;
  onSuccess = function(position) {
    var lat, long;
    lat = position.coords.latitude;
    long = position.coords.longitude;
    return $scope.getEvents(lat, long).then(function(res) {
      $scope.load = false;
      $scope.places = res.response.groups[0].items;
      return console.log($scope.places);
    });
  };
  $scope.getEvents = function(lat, long) {
    var defer;
    defer = $q.defer();
    $http.get("https://api.foursquare.com/v2/venues/explore?client_id=5AVYENTNQPB3RUUTJOG0WWI5IZ3H1FK32U1UUR4PLAKL3LMY&client_secret=3YTBGJ5RZC5RRPCTA4YKVWKYL5EZW2TKO0SYJ4JTMT3YWKPZ&v=20130815%20&ll=" + lat + "," + long + "&section=outdoors").success(function(res) {
      return defer.resolve(res);
    });
    return defer.promise;
  };
  return navigator.geolocation.getCurrentPosition(onSuccess);
});

app.controller("PlaceCtrl", function($scope, $stateParams, $http, $q) {
  console.log("here i am");
  $scope.init = function() {
    return $scope.getEvents().then(function(res) {
      $scope.place = res.response.venue;
      $scope.prefix = $scope.place.photos.groups[0].items[3].prefix + "width";
      $scope.width = $scope.place.photos.groups[0].items[3].width;
      $scope.suffix = $scope.place.photos.groups[0].items[3].suffix;
      $scope.pic = $scope.prefix + $scope.width + $scope.suffix;
      console.log($scope.place);
      $scope.title = $scope.place.name;
      $scope.des = $scope.place.description;
      $scope.add = $scope.place.location.address;
      $scope.lat = $scope.place.location.lat;
      return $scope.long = $scope.place.location.lng;
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

app.controller("SightsCtrl", function($scope, $state, $http, $q) {
  var onSuccess;
  $scope.load = true;
  onSuccess = function(position) {
    var lat, long;
    lat = position.coords.latitude;
    long = position.coords.longitude;
    return $scope.getEvents(lat, long).then(function(res) {
      $scope.load = false;
      $scope.places = res.response.groups[0].items;
      return console.log($scope.places);
    });
  };
  $scope.getEvents = function(lat, long) {
    var defer;
    defer = $q.defer();
    $http.get("https://api.foursquare.com/v2/venues/explore?client_id=5AVYENTNQPB3RUUTJOG0WWI5IZ3H1FK32U1UUR4PLAKL3LMY&client_secret=3YTBGJ5RZC5RRPCTA4YKVWKYL5EZW2TKO0SYJ4JTMT3YWKPZ&v=20130815%20&ll=" + lat + "," + long + "&section=sights").success(function(res) {
      return defer.resolve(res);
    });
    return defer.promise;
  };
  return navigator.geolocation.getCurrentPosition(onSuccess);
});

app.controller("SightCtrl", function($scope, $stateParams, $http, $q) {
  console.log("here i am");
  $scope.init = function() {
    return $scope.getEvents().then(function(res) {
      $scope.place = res.response.venue;
      $scope.prefix = $scope.place.photos.groups[0].items[3].prefix + "width";
      $scope.width = $scope.place.photos.groups[0].items[3].width;
      $scope.suffix = $scope.place.photos.groups[0].items[3].suffix;
      $scope.pic = $scope.prefix + $scope.width + $scope.suffix;
      console.log($scope.place);
      $scope.title = $scope.place.name;
      $scope.des = $scope.place.description;
      $scope.add = $scope.place.location.address;
      $scope.lat = $scope.place.location.lat;
      return $scope.long = $scope.place.location.lng;
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

app.controller("ToDoCtrl", function($scope, $ionicModal, $localForage) {
  $scope.items = [];
  $localForage.getItem("TASKS").then(function(tasks) {
    if (tasks) {
      return $scope.items = tasks;
    }
  });
  $ionicModal.fromTemplateUrl("task-prompt.html", {
    scope: $scope,
    animation: "slide-in-up"
  }).then(function(modal) {
    return $scope.modal = modal;
  });
  $scope.showTaskPrompt = function() {
    var newTask;
    newTask = {
      title: "",
      description: "",
      isComplete: null
    };
    $scope.newTask = newTask;
    return $scope.modal.show();
  };
  $scope.saveTask = function() {
    $scope.items.push($scope.newTask);
    console.log($scope.items);
    return $localForage.setItem("TASKS", $scope.items).then(function() {
      return $scope.modal.hide();
    });
  };
  $scope.cancelTask = function() {
    return $scope.modal.hide();
  };
  $scope.completeItem = function(item) {
    return $scope.removeItem(item);
  };
  $scope.ignoreItem = function(item) {
    return $scope.removeItem(item);
  };
  return $scope.removeItem = function(item) {
    var i;
    i = -1;
    angular.forEach($scope.items, function(task, key) {
      if (item === task) {
        return i = key;
      }
    });
    if (i >= 0) {
      $scope.items.splice(i, 1);
      $localForage.setItem("TASKS", $scope.items);
      true;
    }
    return false;
  };
});

app.controller("UsersCtrl", [
  "$scope", "$http", '$stateParams', '$state', '$location', '$rootScope', 'User', function($scope, $http, $stateParams, $state, $location, $rootScope, User) {
    $scope.newUser = {};
    return $scope.createUser = function() {
      console.log($scope.newUser);
      return User.post($scope.newUser).success(function(data) {
        console.log(data);
        $rootScope.current_user = data;
        return $state.go('app.todo');
      });
    };
  }
]);

app.controller("SessionsCtrl", [
  "$scope", "$http", "$rootScope", "$location", '$state', function($scope, $http, $rootScope, $location, $state) {
    return $scope.addSession = function(loginUser) {
      console.log(loginUser);
      return $http.post("https://ryan-users.herokuapp.com/login.json", {
        user: loginUser
      }).success(function(user) {
        $rootScope.current_user = user;
        return $state.go('app.todo');
      });
    };
  }
]);

var UserFactories;

UserFactories = angular.module("UserFactories", []);

UserFactories.factory('User', [
  '$http', function($http) {
    return {
      post: function(newUser) {
        return $http.post("https://ryan-users.herokuapp.com/users.json", {
          user: newUser
        });
      }
    };
  }
]);
