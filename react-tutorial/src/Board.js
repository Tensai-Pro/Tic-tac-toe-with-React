import React from "react";
import Square from "./Square";

class Board extends React.Component {
    renderSquare(i) {
        let a, b, c;
        if (this.props.winnerLine)
            [a, b, c] = this.props.winnerLine;
        return (
            <Square 
                value={this.props.squares[i]} 
                isWinner={ (i === a || i === b || i === c) ? true : false }
                onClick={ () => this.props.onClick(i) }
            />
        );
    }
  
    render() {
        const boardSize = 3;
        let squares = [];
        for (let i = 0; i < boardSize; i++) {
            let row = [];
            for (let j = 0; j < boardSize; j++) {
                row.push(this.renderSquare(i * boardSize + j))
            }
            squares.push(<div className='board-row'>{row}</div>)
        }

        return (
            <div>
                {squares}
            </div>
        );
    }
}

export default Board;