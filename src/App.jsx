import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winningCombinations";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function determineWinner(gameBoard) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstComb = gameBoard[combination[0].row][combination[0].column];
    const secondComb = gameBoard[combination[1].row][combination[1].column];
    const thirdComb = gameBoard[combination[2].row][combination[2].column];

    if (firstComb && firstComb === secondComb && firstComb === thirdComb) {
      winner = firstComb;
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  gameTurns.map((turn) => {
    gameBoard[turn.square.row][turn.square.col] = turn.player;
  });
  return gameBoard;
}

function App() {
  // States
  const [gameTurns, setGameTurn] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYERS);

  // Dependency Variables
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = determineWinner(gameBoard);
  const hasDraw = gameTurns.length === 9 && !winner;

  // In Component Methods
  function handleSquareClick(rowIndex, colIndex) {
    setGameTurn((prevGameTurns) => {
      const currentPlayer = deriveActivePlayer(prevGameTurns);
      const updatedGameTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevGameTurns];
      return updatedGameTurns;
    });
  }

  function handleRestart() {
    setGameTurn([]);
  }

  function handlePlayerName(symbol, playerName) {
    setPlayerName((previousName) => {
      const updatedName = { ...previousName, [symbol]: playerName };
      return updatedName;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS["X"]} symbol="X" activePlayer={activePlayer === "X"} setGlobalName={handlePlayerName} />
          <Player name={PLAYERS["O"]} symbol="O" activePlayer={activePlayer === "O"} setGlobalName={handlePlayerName} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={playerName[winner]} onRestart={handleRestart} />}
        <GameBoard onSquareClick={handleSquareClick} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
