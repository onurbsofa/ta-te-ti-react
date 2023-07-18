import { WINNER_COMBINATIONS } from "../constants";

export  const checkWinnerFrom = (boardToCheck) => {
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

  export const checkEndGame = (boardToCheck) => {
    //revisamos todas las posiciones del tablero para ver si son diferente a null
    return boardToCheck.every((square) => square !== null)
  }