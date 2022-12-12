import React from "react";

function Square(props) {
    return (
        <button
            className={'square' + (props.isWinner ? ' winner-square' : '')}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    )
}

export default Square;