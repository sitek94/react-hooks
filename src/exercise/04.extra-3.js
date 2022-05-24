// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, onClick}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tic-tac-toe:currentStep',
    0,
  )
  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [
    Array(9).fill(null),
  ])
  const currentSquares = history[currentStep]

  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return
    }

    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue

    setCurrentStep(step => step + 1)
    const historyCopy = history.slice(0, currentStep + 1)
    setHistory(historyCopy.concat([squaresCopy]))
  }

  function restart() {
    setCurrentStep(0)
    setHistory([Array(9).fill(null)])
  }

  const moves = history.map((_, step) => {
    const isCurrent = currentStep === step
    const isGameStart = step === 0
    let desc = isGameStart ? 'Go to game start' : `Go to move #${step}`
    if (isCurrent) desc += ' (current)'
    return (
      <li key={step}>
        <button onClick={() => setCurrentStep(step)} disabled={isCurrent}>
          {desc}
        </button>
      </li>
    )
  })

  return (
    <>
      <h1>{currentStep}</h1>
      <div className="game">
        <div className="game-board">
          <Board onClick={selectSquare} squares={currentSquares} />
          <button className="restart" onClick={restart}>
            restart
          </button>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
