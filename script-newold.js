const gameboard = (() => {
   let turn = 0;
   const board = Array(9).fill('-')

})();

const displayController = (() => {
   const boardDom = document.querySelector("#game-board")
   let cellsDom;

   // initialize
   const init = () => {
      for (let i = 0; i < 9; i++){
         const cell = document.createElement("div")
         cell.setAttribute("class", "cell")
         boardDom.appendChild(cell)
      }
      cellsDom = boardDom.querySelectorAll(".cell")

      cellsDom.forEach((cell, index)=>{
         cell.addEventListener("click", ()=>{ setCell("x", index) });
      })
      //render();
   }

   // back-end
   const setCell = (symbol, index) => {
      board[index] = symbol;
      setCellDom(cellsDom[index], symbol)
      turn++;
   }

   // const checkIfWon = (symbol) => {
   //    if (board[0] )
   // }

   // front-end
   const setCellDom = (cell, symbol) => {
      cell.innerText = symbol
   }

   return { init, setCell }

})();

const Player = (s) => {
   const symbol = s
   const score = 0
   const makeTurn = () => {
      gameboard.setCell(symbol)
   }

   return { symbol, score }
}

gameboard.init()
let player1 = Player("x");
let player2 = Player("o");








