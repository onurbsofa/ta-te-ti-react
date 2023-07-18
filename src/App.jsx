import { useState } from "react"

const TURNS = {
  X: 'X',
  O: 'O'
}

const Square = ({ children, isSelected , updateBoard, index }) => {
  
  const className = `square${isSelected ? ' is-selected' : ''}`
  const handlerClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handlerClick} 
        className={className}
        >
      {children}
    </div>
  )
}

const WINNER_COMBINATIONS = [
  //horizontales
  [0,1,2],
  [3,4,5],
  [6,7,8],
  //verticales
  [0,3,6],
  [1,4,7],
  [2,5,8],
  //diagonales
  [0,4,8],
  [2,4,6]
]



function App() {
  //estados
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) //null es que no hay ganador y false es que hay empate

  //funciones
  const checkWinner = (boardToCheck) => {
    //revisamos si todas las combinaciones de ganadorpara ver si x u o
    for(const combo of WINNER_COMBINATIONS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] && // miró si existe algo
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]){
            return boardToCheck[a] //devuelve el ganador si todo se cumple
          }
    }
    //si no hay ganador
    return null
  }


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
    //revisamos si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    }

  }
  return (
    <main className="board">
        <h1>Ta Te Ti</h1>
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
    </main>

  
  )
}

export default App
