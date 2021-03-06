/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 const board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   for(let x = 0; x < WIDTH; x++){
    board[x] = new Array(HEIGHT).fill(null);
   }
   return board;
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {

   const htmlBoard = document.getElementById("board")
 

   // this code creates the top row on the board
   // on-click event used to determine where the player's piece will go 
   const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
   for (let x = 0; x < WIDTH; x++) {
     const headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);
 

   // first for loop creates each column in the board
   // second loop creates the row/cell, also creates attribute to be used later for piece location
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 // going from the bottom of the board checking for an empty spot
 function findSpotForCol(x) {
   for(let y = HEIGHT-1; y >= 0; y--){
       if(!board[y][x]) {
           return y;
       }
   }
   return null;
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   const gamePiece = document.createElement("div")
   gamePiece.classList.add("piece")
   gamePiece.classList.add(`p${currPlayer}`);
   document.getElementById(`${y}-${x}`).append(gamePiece);
    // if(currPlayer === 1){
    //     gamePiece.classList.add("p1");
    //     document.getElementById(`${y}-${x}`).append(gamePiece); 
    // } else {
    //     gamePiece.classList.add("p2");
    //     document.getElementById(`${y}-${x}`).append(gamePiece);
    // }
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   alert(msg);
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   let x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   let y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   board[y][x] = currPlayer;
   placeInTable(y, x);

 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   if (board[0].every(cell => cell)) {
       return endGame(`It's a TIE!`)
   }
  
   // switch players
  currPlayer = currPlayer === 1 ? 2 : 1; 
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   
   for (let y = 0; y < HEIGHT; y++) {
     for (let x = 0; x < WIDTH; x++) {

      // possible ways players can win
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // will check for the possible win 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();