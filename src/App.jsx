const TURNS = {
  X: 'X',
  O: 'O'
}

const board = Array(9).fill(null)
const Square = ({ children, updateBoard, index }) => {
  return (
    <div className="square">
      {children}
    </div>
  )
}


function App() {
  return (
    <main className="board">
        <h1>Ta Te Ti</h1>
        <section className="game">
        {
          board.map(( index) => {
            return (
              <Square key={index} index={index}>
                
              </Square>
          )
        })
        }
        </section>
    </main>

  
  )
}

export default App
