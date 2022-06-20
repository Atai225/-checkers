import { createSlice } from "@reduxjs/toolkit";
import { blackCheckersWay, canCheckerEat, getChoppedCheckers, whiteCheckersWay, QueensWay, canQueenEat } from "../../utils";

const checkersGame = createSlice({
	name: "checkers",
	initialState: {
		board: [],
		staticBoard: [],
		selectedCell: [],
		choppedCheckers: [],
		allChoppedCheckers: [],
		currentPlayer: 'white',
	},
	reducers: {
		setBoard: (state, action) => {
			state.board = action.payload;
			if (state.staticBoard.length <= 0) {
				state.staticBoard = action.payload;
			}
		},
		setSelected: (state, action) => {
			if (state.selectedCell.length <= 0) {
				state.selectedCell.push(action.payload);
			}
		},
		moveFigure: (state, action) => {
			if (state.selectedCell.length > 0 && state.selectedCell.length < 2) {
				const from = state.selectedCell[0];
				const to = action.payload.cell;
				let letMove;
				if (from.isQueen) {
					if (QueensWay(from, to)) {
						const chopped = canQueenEat(from, to);
						if(chopped.length > 0){
							state.board.forEach((el) => {
								for (let i = 0; i < el.length; i++) {
									const item = el[i];
									for (let j = 0;j < chopped.length;j++ ) {
										const cell = chopped[j];
										if (cell.y === item.y && cell.x === item.x) {
											if(item.checkerColor !== from.checkerColor){
												state.choppedCheckers.push(item);
												let arr = [item];
												state.allChoppedCheckers.push(arr)
											}
										}
									}
								}
							});
						}
						letMove = true;
						
					};

						
				} else {
					if (from.checkerColor === "white") {
						if (whiteCheckersWay(from, to)) {
							letMove = true;
						}
						if (to.y === 0) {
							state.queen = to;
						}
					}
					if (from.checkerColor === "black") {
						if (blackCheckersWay(from, to)) {
							letMove = true;
						}
						if (to.y === 7) {
							state.queen = to;
						}
					}

					action.payload.board.forEach((item) => {
						const canEat = canCheckerEat(from, to, item);
						if (canEat) {
							const chopped = getChoppedCheckers(from, to, item);
							for (let i = 0; i < chopped.length; i++) {
								if (chopped[i] !== undefined && chopped[i].checkerColor !== from.checkerColor) {
									state.choppedCheckers = getChoppedCheckers(from, to, item);
									state.allChoppedCheckers.push(getChoppedCheckers(from, to, item));
									letMove = true;
								}
							}

						}
					})
				}

				if (letMove) {
					state.selectedCell.push(action.payload.cell);
				}
			}
		},
		restartGame: (state) => {
			state.allChoppedCheckers = [];
			state.board = state.staticBoard;
			state.currentPlayer = 'white';
			state.selectedCell = [];
		},
		clearChoppedCheckers: (state) => {
			state.choppedCheckers = [];
		},
		checkSelected: (state, action) => {
			state.selectedCell.shift();
			state.selectedCell.push(action.payload)
		},
		clearSelected: (state) => {
			state.selectedCell = [];
		},
		swapPlayer: (state) => {
			state.currentPlayer = (state.currentPlayer === 'white' ? 'black' : 'white');
		}
	},
});
export default checkersGame.reducer;
export const { setBoard, setSelected, clearSelected, moveFigure, restartGame, checkSelected, swapPlayer, clearChoppedCheckers } = checkersGame.actions;



























