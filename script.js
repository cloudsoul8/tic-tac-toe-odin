const gameBoard = (()=>{
   const board = Array(9).fill('-')
   const setCell = (symbol, index) => {
      board[index] = symbol;
   }
   const getCell = (index) => {
      return board[index];
   }
   return { setCell, getCell }
})();

const Player = (n, s)=> {
   const name = n;
   const symbol = s;
   const makeTurn = (index) => {
      gameBoard.setCell(symbol, index)
   }
   return { makeTurn, symbol, name };
}

const tictactoe = (()=>{
   let _moveNum = 0
   let _players = [];
   let _turnOf = 0;
   let gameEnd = '';
   let winner; // Player data type

   const initGame = (p1,p2) => {
      _players.push(p1);
      _players.push(p2);
      displayController.init()
   }

   const _nextTurn = ()=>{
      _moveNum++;
      _turnOf = _moveNum % 2;
   }


   const setCelltoSymbol = (index) => {
      if (gameBoard.getCell(index) === '-') {
         _players[_turnOf].makeTurn(index);
         _checkIfEnd(_players[_turnOf].symbol)
         return true
      }
   }

   // logic
   const _checkIfEnd = (symbol) => {
      const symbolX3 = symbol+symbol+symbol
      for (let i = 0; i < 3; i++) {
         if ((gameBoard.getCell(0+i*3) + gameBoard.getCell(1+i*3) + gameBoard.getCell(2+i*3) === symbolX3) ||
             (gameBoard.getCell(0+i) + gameBoard.getCell(3+i) + gameBoard.getCell(6+i) === symbolX3) ||
             (gameBoard.getCell(0) + gameBoard.getCell(4) + gameBoard.getCell(8) === symbolX3) ||
             (gameBoard.getCell(2) + gameBoard.getCell(4) + gameBoard.getCell(6) === symbolX3) )
         {
            gameEnd = 'win';
            winner = _players[_turnOf];
            console.log(1)
            break;
         }
         else if (_moveNum === 8) {
            gameEnd = 'draw';
            break;
         }
      }
      _nextTurn();
   }

   const getGameEnd = () => gameEnd
   const getWinner = () => winner

   return { initGame, setCelltoSymbol, getWinner, getGameEnd }
})();

const displayController = (()=> {
   const boardDom = document.querySelector("#game-board");
   const endDom = document.querySelector("#end-screen");
   let cellsDom;

   const init = () => {
      for (let i = 0; i < 9; i++) {
         const cell = document.createElement("div")
         cell.setAttribute("class", "cell")
         cell.addEventListener("click", ()=>{ setCellDom(i) })
         boardDom.appendChild(cell)
      }
      cellsDom = boardDom.querySelectorAll(".cell")
   }

   const setCellDom = (index)=> {
      if (tictactoe.setCelltoSymbol(index)) {
         let symbolToWrite = gameBoard.getCell(index);
         let imageSymbol = document.createElement("img")
         if (symbolToWrite === 'x') {
            imageSymbol.src = `imgs/x-sym/${(Math.floor(Math.random() * 3) + 1)}.png`
         }
         else if (symbolToWrite === 'o') {
            imageSymbol.src = `imgs/o-sym/${(Math.floor(Math.random() * 3) + 1)}.png`
         }

         cellsDom[index].appendChild(imageSymbol);
         updateDomIfEnd();
      }
      
   }

   const updateDomIfEnd = ()=> {
      if (tictactoe.getGameEnd() === 'win') {
         endDom.style.visibility = 'visible'
         endDom.innerText = `${tictactoe.getWinner().name} wins!`
      }
      else if (tictactoe.getGameEnd() === 'draw' ){
         endDom.style.visibility = 'visible'
         endDom.innerText = "it's a draw..."
      }
   }
   return { init }
})();

tictactoe.initGame(Player('Player 1', 'x'), Player('Player 2', 'o'));

