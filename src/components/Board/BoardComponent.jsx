import React, { useEffect } from 'react'
import CellComponent from '../Cell/CellComponent'
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux'
import {checkSelected, moveFigure, setSelected } from '../../store/reducers/game.reducer';

function BoardComponent({ board }) {
	const dispatch = useDispatch();
	const selected = useSelector(store => store.game.selectedCell)
	const currentPlayer = useSelector(store => store.game.currentPlayer)

	const clicked = (cell) => {
		if(cell.color === 'black' && selected.length <= 0 && cell.checkerColor === currentPlayer){
			dispatch(setSelected(cell))
		}
		if(selected.length === 1){
			const cellBoard = {
				cell: cell,
				board: board
			}
			if(selected[0].checkerColor === cell.checkerColor){
				dispatch(checkSelected(cell))
				dispatch(moveFigure(cellBoard))
			}else if(cell.checkerColor === 'none'){
				dispatch(moveFigure(cellBoard))
			}
		}
	}
	


	return (
			<div className='board'>
				{board.length > 0 &&
					board.map((row, index) => (
						<React.Fragment key={index}>
							{row.map((cell) => (
								<CellComponent click={clicked} 
								selected = {selected}
								cell={cell} key={cell.id} />
							))}
						</React.Fragment>
					))
				}
			</div>
	)
}

export default BoardComponent