const TURNS = {
  X: 'X',
  O: 'O'
}

const board = Array(9).fill(null)

function App() {
  return (
    <main className="board">
        <h1>Ta Te Ti</h1>
        <section className="game">
        {
          board.map(( value, index) => {
            return (
            <div className="cell" key={index}>
              <span className="cell__content">
              {index}
              </span>
            </div>
          )
        })
        }
        </section>
    </main>

  
  )
}

export default App
