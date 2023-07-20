import { useState,useEffect } from "react"
import confetti from "canvas-confetti"
import {TURNS, WINNER_COMBINATIONS} from './constants.js'
import {Square} from "./components/Square.jsx"
import {checkWinnerFrom, checkEndGame} from "./utils/board.js"
import {WinnerModal} from "./components/WinnerModal.jsx"
import { saveGameToStorage, resetGameStorage } from "./utils/storage/index.js"


function App() {

  //estados
  const [board, setBoard] = useState(()=>{
    const boardForStorage = window.localStorage.getItem('board')
    return boardForStorage ? JSON.parse(boardForStorage) : Array(9).fill(null)
  }) 
  //guardamos el turno en el local storage
  const [turn, setTurn] = useState(() => {
    const turnForStorage = window.localStorage.getItem('turn')
    return turnForStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null) //null es que no hay ganador y false es que hay empate

  //volvemo al estado incial del juego poniendo los estados como estaban esto es la magia de react
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    //reseteamos el local storage
    resetGameStorage()

  }

  //ejemplo de useEffect
  useEffect(() => {
    console.log('gano ${winner}')
  }, [winner])
  //ganador por consola
 

  const updateBoard = (index) => {
    // no actualuizamos esta posición si ya esta ocupada
    if(board[index] || winner )return
    //creamos un array superficial para guardar las posiciones donde fueron clickeados los turnos
    const newBoard = [...board]//srpead operator y rest operator
    //
    newBoard[index] = turn// guarda el turno en la posicion del index
    //
    setBoard(newBoard)//actualiza el tablero con el array superficial que creamos en newBoard
    //cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    //
    setTurn(newTurn)
    //guardamos el juego en el local storage
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    //revisamos si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      setWinner(newWinner)
      confetti()
     /*  alert(`Ganó ${newWinner}`) */ // esto se ejecutaria antes que el estado del tablero se actualice porque la actualizacion de los hooks son asincronos
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }

  }
  return (
    <main className="board">
        <h1>Ta Te Ti</h1>
        <button onClick={resetGame}>Reset del juego</button>
        <section className="game">
        {
          board.map(( square, index) => {
            return (
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}
                >
                {square}
              </Square>
          )
        })
        }
        </section>

        <section className="turn">

          <Square isSelected ={turn === TURNS.X}>
            {TURNS.X}
          </Square>

          <Square isSelected ={turn === TURNS.O}>
            {TURNS.O}
          </Square>

        </section>

      <WinnerModal 
      resetGame={resetGame} 
      winner={winner}/>


    </main>

  
  )
}

export default App
