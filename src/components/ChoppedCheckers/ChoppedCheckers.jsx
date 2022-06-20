import React from 'react'
import { useSelector } from 'react-redux';
import black from '../../images/b.png'
import white from '../../images/w.png'
import blackQueen from '../../images/bq.png';
import whiteQueen from '../../images/wq.png';

import '../../App.css'

function ChoppedCheckers() {
	const allChoppedCheckers = useSelector(store => store.game.allChoppedCheckers);
	const currentPlayer = useSelector(store => store.game.currentPlayer);
	return (
				<>
				<h2 className='move__title'>Move: {currentPlayer}</h2>
				<h2 className='chopped__title'>Chopped checkers</h2>
				<div className='choppedCheckers'>
					<ul className='choppedCheckers-list'>
						<h4>White</h4>
						{allChoppedCheckers.map((item) => (
							item.map((el) => {
								return <React.Fragment key={el.id}>{el.checkerColor === 'white' && 
								<li ><img className='choppedChecker-img' src={el.isQueen ? (whiteQueen) : (white)} alt="" /></li>}
								</React.Fragment>
							})
							
						))}
					</ul>
					<ul className='choppedCheckers-list'>
						<h4>Black</h4>

						{allChoppedCheckers.map((item) => (
						item.map((el) => {
							return <React.Fragment key={el.id}>{el.checkerColor === 'black' && <li><img className='choppedChecker-img' 
							src={el.isQueen ? (blackQueen) : (black)}  alt="" /></li>}</React.Fragment>
						})
						))}
					</ul>
				</div>
				</>
	)
}

export default ChoppedCheckers