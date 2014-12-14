app.controller "GamesCtrl", ($scope) ->



app.controller "HangCtrl", ($scope) ->



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
        alert "Tie game!"
        GameHistory.push
          player:
            X: $scope.player.X
            O: $scope.player.O

          winner: "Tie"

      else
        winner = $scope.board.getWinner()
        alert ($scope.player[winner] or winner) + " won!"
        GameHistory.push
          player:
            X: $scope.player.X
            O: $scope.player.O

          winner: winner


  $scope.newGame = ->
    $scope.board.reset()

