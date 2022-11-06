const gameboard = (() => {
   let turn = 0;
   const board = Array(9).fill('-')

   const boardDom = document.querySelector("#game-board")
   const cellsDom = document.querySelectorAll(".cell")


   // initialize
   const init = () => {
      cellsDom.forEach((cell, index)=>{
         cell.addEventListener("click", ()=>{ setCell("x",index) });
      })
      render();

   }

   // back-end
   const setCell = (symbol, index) => {
      board[index] = symbol;
      setCellDom(cellsDom[index])
      turn++;
   }

   // const checkIfWon = (symbol) => {
   //    if (board[0] )
   // }

   // front-end
   const render = () => {     
      // boardDom.innerText = ""
      // board.forEach((cell)=> {
      //    const cellDom = document.createElement("div")
      //    cellDom.setAttribute("class", "cell")

      //    cellDom.innerHTML = cell
      //    boardDom.appendChild(cellDom)
      // })
      //
      // cellsDom.forEach((cell) => {
      //    cell.innerHTML = lkl
      // })
   }

   const setCellDom = (cell) => {
      cell.innerText = "X"
   }

   return { init, setCell }

})();

const Player = (s) => {
   const symbol = s
   const score = 0
   const makeTurn = () => {
      gameboard.setCell(symbol)
   }

   return { symbol, makeTurn }
}

gameboard.init()
let player1 = Player("x");
let player2 = Player("o");








