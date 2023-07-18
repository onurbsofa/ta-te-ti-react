import { Square } from "./Square";
export function WinnerModal({winner, resetGame}) {
   if(winner === null ) return null
    //contantes afuera del return para dejar el componente mas limpio
    const winnerText = winner === false ? 'Empate' : `Ganó `

     return( <section className="winner">
        <div className="text">
          <h2>
            {winnerText}
          </h2>

          <header className="win">
            {winner && <Square>{winner}</Square>}
          </header>

          <footer>
            <button onClick={resetGame}>empezar de nuevo</button>
          </footer>

        </div>
      </section>
    )
  }