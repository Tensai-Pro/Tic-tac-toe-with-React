import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                latestMovePos: 0,
            }],
            stepNumber: 0,
            xIsNext: true,
            isAscendingOrder: true, 
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares: squares, 
                latestMovePos: i,
            }),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(move) {
        this.setState({
            stepNumber: move,
            xIsNext: move % 2 === 0,
        });
    }

    changeOrder() {
        this.setState({
            isAscendingOrder: !this.state.isAscendingOrder,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const result = calculateWinner(current.squares);

        const moves = history.map((move, step) => {
            const latestMovePos = move.latestMovePos;
            const row = Math.floor(latestMovePos / 3) + 1;
            const col = latestMovePos % 3 + 1;

            const desc = step ? `Go to move #${step} (${row}, ${col})` : "Go to game start";
            return (
                <li key={step}>
                    <button 
                        className={ this.state.stepNumber === step ? 'current-selected-move' : '' }
                        onClick={ () => this.jumpTo(step) }
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        let status;
        if (result.winner) {
            status = "Winner: " + result.winner;
        }
        else if (result.isDraw) {
            status = "Draw";
        }
        else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        const isAscendingOrder = this.state.isAscendingOrder;

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        winnerLine={result.winnerLine}
                        onClick={ (i) => this.handleClick(i) }
                    />
                </div>
                
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{isAscendingOrder ? moves : moves.reverse()}</ol>
                </div>

                <div>
                    <button onClick={ () => this.changeOrder() }>Sort by: {isAscendingOrder ? "ascending" : "descending"}</button>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
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

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                winnerLine: lines[i],
                isDraw: false,
            };
        }
    }

    for (let i = 0; i < squares.length; i++)
        if (squares[i] === null) 
            return {
                winner: null,
                winnerLine: null,
                isDraw: false,
            };

    return {
        winner: null,
        winnerLine: null,
        isDraw: true,
    }
}

export default Game;