app = angular.module("starter", ["ionic"]).run(($ionicPlatform) ->
  $ionicPlatform.ready ->
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar true  if window.cordova and window.cordova.plugins.Keyboard
    StatusBar.styleDefault()  if window.StatusBar

).config(($stateProvider, $urlRouterProvider) ->
  $stateProvider.state("app",
    url: "/app"
    abstract: true
    templateUrl: "templates/menu.html"
    controller: "AppCtrl"

  # DRIBBLE CONTROLLER
  ).state("app.dribble",
    url: "/dribble"
    views:
      menuContent:
        templateUrl: "templates/dribble.html"
        controller: "DribbleCtrl"

  # MUSIC CONTROLLER

  ).state("app.concerts",
    url: "/concerts"
    views:
      menuContent:
        templateUrl: "templates/concert.html"
        controller: "ConcertCtrl"
  # ).state("app.concert",
  #   url: "/concerts/:concertId"
  #   views:
  #     menuContent:
  #       templateUrl: "templates/concert.html"
  #       controller: "ConcertCtrl"


  #GAMES CONTROLLER
  ).state("app.games",
    url: "/games"
    views:
      menuContent:
        templateUrl: "templates/games.html"
        controller: "GamesCtrl"

  ).state("app.hangman",
    url:"/games/hangman"
    views:
      menuContent:
        templateUrl: "templates/hangman.html"
        controller: "HangCtrl"
  ).state("app.tictac",
    url:"/games/tictac"
    views:
      menuContent:
        templateUrl: "templates/tictac.html"
        controller: "TicCtrl"

  #  TO DO LIST CONTROLLER
  ).state("app.todo",
    url:"/todo"
    views:
      menuContent:
        templateUrl: "templates/todo.html"
        controller: "ToDoCtrl"
  ).state("app.foods",
    url:"/food"
    views:
      menuContent:
        templateUrl: "templates/foods.html"
        controller: "FoodsCtrl"
  ).state("app.food",
    url:"/food/:foodlistId"
    views:
      menuContent:
        templateUrl: "templates/food.html"
        controller: "FoodCtrl"
  ).state("app.places",
    url:"/places"
    views:
      menuContent:
        templateUrl: "templates/places.html"
        controller: "PlacesCtrl"
  ).state("app.place",
    url:"/places/:placeId"
    views:
      menuContent:
        templateUrl: "templates/place.html"
        controller: "PlaceCtrl"

  ).state("app.playlists",
    url: "/playlists"
    views:
      menuContent:
        templateUrl: "templates/playlists.html"
        controller: "PlaylistsCtrl"
  ).state "app.single",
    url: "/playlists/:playlistId"
    views:
      menuContent:
        templateUrl: "templates/playlist.html"
        controller: "PlaylistCtrl"


  # if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise "/app/playlists"
)

# foursquarel ink
# https://api.foursquare.com/v2/venues/explore?client_id=5AVYENTNQPB3RUUTJOG0WWI5IZ3H1FK32U1UUR4PLAKL3LMY&client_secret=3YTBGJ5RZC5RRPCTA4YKVWKYL5EZW2TKO0SYJ4JTMT3YWKPZ&v=20130815%20&near=San%20Francisco,%20CA&section=topPicks
