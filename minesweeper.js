document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
    { row: 0, col: 0, isMine: false, isMarked: false, hidden: true }, 
    { row: 0, col: 1, isMine: false, isMarked: false, hidden: true },
    { row: 0, col: 2, isMine: false, isMarked: false, hidden: true },
    { row: 1, col: 0, isMine: true, isMarked: false, hidden: true },
    { row: 1, col: 1, isMine: false, isMarked: false, hidden: true },
    { row: 1, col: 2, isMine: false, isMarked: false, hidden: true },
    { row: 2, col: 0, isMine: true, isMarked: false, hidden: true },
    { row: 2, col: 1, isMine: false, isMarked: false, hidden: true },
    { row: 2, col: 2, isMine: false, isMarked: false, hidden: true }
  ]
}

function startGame () {
  //Write a for loop to count the number of mines surrounding each cell
  for (var i = 0; i < board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  //Each iteration of the loop calls countSurroundingMines()
  //The cell is the argument passed to the function
  //The returned result to be assigned to a new property on the object surroundingMines

  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  //Need to check if isMine && isMarked. 
  //Then if true check if !hidden. If that's true then win.
  //Not sure of the best order to do this.
  //ToDo figure out how to deal with isMarked - I guess that only happens on contextmenu event.
  for (var i = 0; i < board.cells.length; i++){
    if (board.cells[i].isMine) {

      lib.displayMessage('You win!')
    }
  }

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {

  var arrSurroundingCells = lib.getSurroundingCells(cell.row, cell.col)

  var countSurroundingCells = 0
  //for loop to increment surrounding count when cell.isMine is true
  for (var i = 0; i < arrSurroundingCells.length; i++) {

    if (arrSurroundingCells[i].isMine) {
      countSurroundingCells += 1
    }
  }
  //console.log(board)
  return countSurroundingCells
}

