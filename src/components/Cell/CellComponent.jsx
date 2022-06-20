import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../App.css';
import black from '../../images/b.png'
import white from '../../images/w.png'
import whiteQueen from '../../images/wq.png'
import blackQueen from '../../images/bq.png'


function CellComponent({ cell, click }) {
	const [active, setActive] = useState(false);
	const selected = useSelector(store => store.game.selectedCell)
	const currentPlayer = useSelector(store => store.game.currentPlayer)
	const queen = useSelector(store => store.game.queen)
	const board = useSelector(store => store.game.board)


	useEffect(() => {
		if(selected.length > 0){
			if(selected[0].x === cell.x && selected[0].y===cell.y && selected[0].checkerColor === currentPlayer){
				setActive(true)
			}else{
				setActive(false)
			}
		}else{
			setActive(false)
		}
	}, [selected, cell]);

	


	return (
		<div className={['cell', cell.color, active ? 'selected' : ''].join(' ')} onClick={() => click(cell)} style={{ background: cell.available && cell.checkerColor ? 'green' : '' }}>
				{cell.checkerColor && cell.checkerColor === 'white' && <img src={cell.isQueen ? (whiteQueen) : (white)} alt="" />}
				{cell.checkerColor && cell.checkerColor === 'black' && <img src={cell.isQueen ? (blackQueen) : (black)} alt="" />}
		</div>
	)
}

export default CellComponent