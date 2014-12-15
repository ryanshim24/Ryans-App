app.controller "GamesCtrl", ($scope) ->



app.controller "HangCtrl", ($scope) ->
  $scope.letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
  $scope.points = 0

  $scope.newGame = (providedWord)->
    $scope.intro = true
    $scope.game = true
    $scope.word = []
    providedWord.split("").forEach (letter) ->
      $scope.word.push
        name: letter
        guessed: false

    $scope.points = 0
    $scope.gameLetters = $scope.letters.slice()

  $scope.check = (guess) ->
    $scope.gameLetters.splice $scope.gameLetters.indexOf(guess), 1
    correct = false
    $scope.word.forEach (letter) ->
      if letter.name is guess
        letter.guessed = true
        correct = true

    unless correct
      $scope.points++
      if $scope.points is 6
        $scope.status = "Sorry, You Lose"
        $scope.game = false
        $scope.victory = true

    $scope.word.forEach(letter) ->
      if letter.gussed is true

        $scope.status = "Congrats!, You won!"
        $scope.game = false
        $scope.victory = true

      $scope.guess = ""


app.controller "TicCtrl", ($scope) ->

  $scope.board = new TicTacToeBoard()
  $scope.currentPlayer = "X"
  $scope.nextPlayer = "O"
  $scope.player = $scope.player or
    X: ""
    O: ""

  $scope.cellClick = (x, y) ->
    return  if $scope.board.isGameOver()
    if $scope.board.getCell(x, y) is ""
      $scope.board.setCell x, y, $scope.currentPlayer
      temp = $scope.currentPlayer
      $scope.currentPlayer = $scope.nextPlayer
      $scope.nextPlayer = temp
    if $scope.board.isGameOver()
      if $scope.board.isTie()
        $scope.status= "Tie game!"


      else
        winner = $scope.board.getWinner()
        $scope.status = ($scope.player[winner] or winner) + " won!"


  $scope.newGame = ->
    $scope.board.reset()

