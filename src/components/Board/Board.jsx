
export const Board = () => {
	const board = [];
	for (let i = 0; i < 8; i++) {
		const row = [];
		for (let j = 0; j < 8; j++) {
		  if ((i + j) % 2 !== 0) {
			const cell = {
			  x: j,
			  y: i,
			  color: 'black',
			  checkerColor:(i < 3 && 'black') || (i > 4 && 'white') || 'none',
			  available: false,
			  id: Math.random()
			}
			row.push(cell)
		  }else{
			const cell = {
			  x: j,
			  y: i,
			  available: false,
			  color: 'white',
			  id: Math.random()
			}
			row.push(cell)
		  }
		}
	   board.push(row)
	}
	return board;
		   
}

