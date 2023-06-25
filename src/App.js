import { useState } from 'react';
import Cell from './Components/Cell';


function calWinner(cells) {

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      console.log(`the winner is ${cells[a]}`)
      return cells[a];
    }
  }

  return null;
}

let totalTurn = 1;
let xTurn = true;

function App() {

  // const [xTurn, setXturn] = useState(true)
  const [cells, setCells] = useState(Array(9).fill(null))
  const [history, setHistory] = useState([Array(9).fill(null)])



  const moveHistory = [];
  for(let i = 0; i < history.length; i ++){
    moveHistory.push(<li key={i} onClick={() => { goToMove(i) }}>Go to Move : #{i}</li>)
  }


  function haldelClick(i) {
    if (cells[i] || calWinner(cells)) {
      return;
    }


    // console.log('prev : ' + totalTurn)
    // setTotalTurn(totalTurn + 1)
    totalTurn ++;
    // console.log('next : ' + totalTurn)

    const prevCells = [...cells];
    if (xTurn) {
      prevCells[i] = "X";
    } else {
      prevCells[i] = "O";
    }

    setHistory([...history, prevCells]);

    setCells(prevCells)
    // setXturn(!xTurn)
    xTurn = !xTurn;

    if(history.length > totalTurn){
      
      const prevHis = history.slice(0);
      prevHis.splice(totalTurn, (history.length - totalTurn))
      prevHis.push(prevCells);
      // console.log(prevHis)
      setHistory(prevHis);
      // console.log(history)
    }
  }

  const winner = calWinner(cells);
  let status;
  if (winner) {
    status = `winner is : ${winner}`
  } else {
    if (xTurn) {
      status = `Next Turn : X`
    } else {
      status = `Next Turn : O`
    }
  }

  function goToMove(i) {

    // console.log('i : ' + i)
    setCells(history[i])
    totalTurn = i;

    console.log(totalTurn)

    if(!(totalTurn % 2)){
      
      // let prevX = xTurn;
      // if(!xTurn){
      //   prevX = !xTurn;
      // }
      // setXturn(prevX)
      xTurn = true;
      console.log(xTurn)
    }
    // console.log('T : ' + totalTurn)
  }


  return (
    <div className="App">
      <div>
        <h3>{status}</h3>
        <div className='row'>
          <Cell value={cells[0]} onClick={() => { haldelClick(0) }} />
          <Cell value={cells[1]} onClick={() => { haldelClick(1) }} />
          <Cell value={cells[2]} onClick={() => { haldelClick(2) }} />
        </div>
        <div className='row'>
          <Cell value={cells[3]} onClick={() => { haldelClick(3) }} />
          <Cell value={cells[4]} onClick={() => { haldelClick(4) }} />
          <Cell value={cells[5]} onClick={() => { haldelClick(5) }} />
        </div>
        <div className='row'>
          <Cell value={cells[6]} onClick={() => { haldelClick(6) }} />
          <Cell value={cells[7]} onClick={() => { haldelClick(7) }} />
          <Cell value={cells[8]} onClick={() => { haldelClick(8) }} />
        </div>
      </div>

      <ul className='hisList'>{moveHistory}</ul>
    </div>
  );
}

export default App;
