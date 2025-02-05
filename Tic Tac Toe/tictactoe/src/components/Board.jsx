import React, { useState } from 'react';
import Square from './Square';
import './Board.css';

const Board = () => {
    const [state, setState] = useState(Array(9).fill(null));
    const [isXturn, setXturn] = useState(true);

    const checkWinner = () => {
        const chances = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8]
        ];

        for(let chance of chances){
            let [a, b, c] = chance;

            if(a !== null && state[a] === state[b] && state[b] === state[c]){
                return state[a];
            }
        }
    }

    const isWinner = checkWinner();

    const handleClick = (index) => {
        if(state[index] !== null){
            return;
        }
        let copyState = [...state]
        copyState[index] = isXturn ? "X" : "O";
        setXturn(!isXturn);
        setState(copyState);
    }

    const reset = () => {
        setState(Array(9).fill(null));
    }

  return (
    <div>
        {isWinner 
            ? <div>
                <h1>{isWinner} is Winner</h1>
                <button onClick={reset} className="playAgain">Play Again</button>
            </div>
            : 
            <>
                <h2>Player {isXturn ? 'X' : 'O'}'s turn</h2>
                <div className="board">
                    <div className="row">
                      < Square onClick={() => handleClick(0)} value={state[0]}/>
                      < Square onClick={() => handleClick(1)} value={state[1]}/>
                      < Square onClick={() => handleClick(2)} value={state[2]}/>
                    </div>
                    <div className="row">
                      < Square onClick={() => handleClick(3)} value={state[3]}/>
                      < Square onClick={() => handleClick(4)} value={state[4]}/>
                      < Square onClick={() => handleClick(5)} value={state[5]}/>
                    </div>
                    <div className="row">
                      < Square onClick={() => handleClick(6)} value={state[6]}/>
                      < Square onClick={() => handleClick(7)} value={state[7]}/>
                      < Square onClick={() => handleClick(8)} value={state[8]}/>
                    </div>
                </div>
            </>
        }
    </div>
  )
}

export default Board;
