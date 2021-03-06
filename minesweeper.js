document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
    { row: 0, col: 0, isMine: false, hidden: true }, 
    { row: 0, col: 1, isMine: false, hidden: true },
    { row: 0, col: 2, isMine: false, hidden: true },
    { row: 1, col: 0, isMine: true, hidden: true },
    { row: 1, col: 1, isMine: false, hidden: true },
    { row: 1, col: 2, isMine: false, hidden: true },
    { row: 2, col: 0, isMine: true, hidden: true },
    { row: 2, col: 1, isMine: false, hidden: true },
    { row: 2, col: 2, isMine: false, hidden: true }
  ]
}

function startGame () {
  //Write a for loop to count the number of mines surrounding each cell
  for (let i = 0; i < board.cells.length; i++){
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

  var allCellsUnhidden = areAllCellsUnhidden()
  var allMinesMarked = areAllMinesMarked()

  if (allCellsUnhidden && allMinesMarked){
    lib.displayMessage('You win!')
  }
}

function areAllCellsUnhidden(){
  let numberOfMines = 0
  let numberOfUnhiddenCells = 0

  for( let i = 0; i < board.cells.length; i++){
    if(board.cells[i].isMine === true){
      numberOfMines ++
    }
  }

  for( let i = 0; i < board.cells.length; i++){
    if(board.cells[i].hidden === false && !board.cells[i].isMine){
      numberOfUnhiddenCells ++
    }
    // Cells containing mines are never unhidden so you need to consider that when evaluating if enough cells are unhidden to declare victory.
  } return (numberOfUnhiddenCells + numberOfMines === board.cells.length)
} 

function areAllMinesMarked(){
  let numberOfMines = 0
  let numberOfMarkedMines = 0
  for( let i = 0; i < board.cells.length; i++){
    if(board.cells[i].isMine === true){
      numberOfMines ++
    }
  }

  for( let i = 0; i < board.cells.length; i++){
    if(board.cells[i].isMine && board.cells[i].isMarked){
      numberOfMarkedMines ++
    }
  }

  return (numberOfMines === numberOfMarkedMines)
}
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')


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

