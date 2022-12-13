# Extra improvements suggested in the end of the tutorial
## Display the location for each move in the format (col, row) in the move history list.
Add a variable **latestMovePos** that defines a position of the last move taken in this.state in the constructor.
```javascript
constructor(props) {
    super(props);
    this.state = {
		history: [{
			squares: Array(9).fill(null),
			latestMovePos: 0,
        }],
        stepNumber: 0,
		xIsNext: true,
	};
}
```
