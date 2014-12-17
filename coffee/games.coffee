app.controller "GamesCtrl", ($scope) ->



app.controller "HangCtrl", ($scope, $ionicModal) ->
  console.log $scope.theWord

  $ionicModal.fromTemplateUrl("hang-prompt.html",
    scope: $scope
    animation: "slide-in-up"
  ).then (modal) ->
    $scope.modal = modal
    $scope.showTaskPrompt()

  $ionicModal.fromTemplateUrl("win-prompt.html",
    scope: $scope
    animation: "slide-in-up"
  ).then (modal) ->
    $scope.fodal = modal

  $ionicModal.fromTemplateUrl("lose-prompt.html",
    scope: $scope
    animation: "slide-in-up"
  ).then (modal) ->
    $scope.lodal = modal


  $scope.showTaskPrompt = ->
    $scope.modal.show()

  $scope.newGame = (theWord, theHint) ->
    $scope.alph = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    $scope.modal.hide()
    $scope.game = true
    $scope.counter = true
    $scope.count = 0

    $scope.savedWord = theWord.toLowerCase()
    $scope.letters = $scope.savedWord.split('')

    $scope.guess = []
    $scope.spaces = []

    $scope.hang = {}

    a = 0
    while a < $scope.letters.length
      $scope.spaces.push("")
      a += 1

  $scope.checking = (letter) ->
    console.log letter

    this.clicked = true # hide the letter that clicked

    right = false # To check if the letter chosen is right

    i = 0 # loop through the letters arary to see if the letter chosen is inside
    while i < $scope.letters.length

      if $scope.letters[i] is letter # if the letter is in the word
        $scope.guess[i] = letter # push that letter into the array
        right = true # right is set to true
        console.log $scope.guess

        checkSpace = false # checking for the empty spaces inside the array
        j = 0
        while j < $scope.guess.length
          if $scope.guess[j] is undefined
            checkSpace = true
          j++


        # Win conditions if the guess array is the same length as the letters array
        # and no more
       if $scope.guess.length is $scope.letters.length && checkSpace is false
          console.log "here i am i win"
          $scope.fodal.show()
          $scope.alph = []



      # If we loop through the letters and we couldn't find it based on what we clicked
      else if i is $scope.letters.length-1 && right is false
        $scope.count += 1
        $scope.hang[$scope.count] = true
        if $scope.count is 6
          console.log "here i am"
          $scope.lodal.show()
          $scope.alph = []

      i++

  $scope.playAgain = ->
    console.log "here I am"
    $scope.fodal.hide()
    $scope.lodal.hide()
    $scope.modal.show()



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

