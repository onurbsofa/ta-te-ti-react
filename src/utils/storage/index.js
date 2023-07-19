export const saveGameToStorage = ({board, turn}) =>{
        //guardamos el estado del tablero
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () =>{
        window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}