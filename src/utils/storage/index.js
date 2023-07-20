//ahora podemos guardar el estado del tablero en el local storage o lo que queramos con este modulo cambiando los valores
export const saveGameToStorage = ({board, turn}) =>{
        //guardamos el estado del tablero
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () =>{
        window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}