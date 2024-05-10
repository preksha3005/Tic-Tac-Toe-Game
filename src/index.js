import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import circle from "./Assets/circle.png";
import cross from "./Assets/cross.png";

const root = ReactDOM.createRoot(document.getElementById("root"));
function Page() {
  const [data, setData] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);

  function toggle(num) {
    if (lock || data[num] !== "") {
      return;
    }
    const newData = [...data]; //use spread operator and create a copy of data in newData to prevent direct modification of data
    newData[num] = count % 2 === 0 ? "0" : "X";
    setCount(count + 1);
    setData(newData);

    // checkWin(newData);
  }

  React.useEffect(() => {
    const result = checkWin(data);
    if (result) {
      setLock(true);
    }
  }, [data]);

  function checkWin(newData) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        newData[a] &&
        newData[a] === newData[b] &&
        newData[a] === newData[c]
      ) {
        // setLock(true);
        return newData[a];
      }
    }
    if (count === 8) {
      // setLock(true);
      return "draw";
    }
    return null;
  }

  function resetGame() {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);
  }

  return (
    <div>
      <h1 className="title">
      {lock?(checkWin(data)==="draw"?"It's a DRAW": `Player ${checkWin(data)} Wins!`):"Tic-Tac-Toe Game"}
      </h1>
      <div className="board">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <div
            key={num}
            className="boxes"
            onClick={() => {
              toggle(num);
            }}
          >
            {data[num] === "0" && <img src={circle} alt="circle" />}
            {data[num] === "X" && <img src={cross} alt="cross" />}
          </div>
        ))}
      </div>

      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}
root.render(<Page />);
