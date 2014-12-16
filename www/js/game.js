
var TicTacToeBoard = (function(){
        function TicTacToeBoard() {
          this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
          ];
          this.winner = null;
        }

        TicTacToeBoard.prototype.reset = function() {
          TicTacToeBoard.call(this);
        };

        TicTacToeBoard.prototype.getCell = function(x, y) {
          return this.board[x][y];
        };

        TicTacToeBoard.prototype.setCell = function(x, y, value) {
          this.board[x][y] = value;
          this.findWinner();
        };

        /** @private */
        TicTacToeBoard.prototype.findWinner = function() {
          var i;

          if(!!this.winner) {
            return;
          }

          for(i = 0; i < this.board.length; i++) {
            this.winner = this.getHorizontalWinner(i);
            if(!!this.winner) {
              return;
            }
          }

          for(i = 0; i < this.board[0].length; i++) {
            this.winner = this.getVerticalWinner(i);
            if(!!this.winner) {
              return;
            }
          };

          this.winner = this.getDiagonalWinner("forward");
          if(!!this.winner) {
            return;
          }

          this.winner = this.getDiagonalWinner("backward");
        };

        TicTacToeBoard.prototype.getHorizontalWinner = function(row) {
          var board = this.board;

          if(board[row][0] === "") {
            return null;
          }

          if(board[row][0] !== board[row][1]) {
            return null;
          }

          if(board[row][1] !== board[row][2]) {
            return null;
          }

          return board[row][0];
        };

        TicTacToeBoard.prototype.getVerticalWinner = function(column) {
          var board = this.board;

          if(board[0][column] === "") {
            return null;
          }

          if(board[0][column] !== board[1][column]) {
            return null;
          }

          if(board[1][column] !== board[2][column]) {
            return null;
          }

          return board[0][column];
        };

        TicTacToeBoard.prototype.getDiagonalWinner = function(direction) {
          var board = this.board;
          if(direction === "forward") {
            if(board[2][0] !== "" && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
              return board[2][0];
            } else {
              return null;
            }
          } else {
            if(board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
              return board[0][0];
            } else {
              return null;
            }
          }
        };

        TicTacToeBoard.prototype.isFull = function() {
          for(var i = 0; i < this.board.length; i++) {
            for(var j = 0; j < this.board[i].length; j++) {
              if(this.board[i][j] === "") {
                return false;
              }
            }
          }
          return true;
        };

        TicTacToeBoard.prototype.isGameOver = function() {
          return this.isFull() || this.hasWinner();
        };

        TicTacToeBoard.prototype.isTie = function() {
          return this.isFull() && !this.hasWinner();
        };

        TicTacToeBoard.prototype.hasWinner = function() {
          return !!this.winner;
        };

        TicTacToeBoard.prototype.getWinner = function() {
          return this.winner;
        };

        return TicTacToeBoard;
      })();