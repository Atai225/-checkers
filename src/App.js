import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import BoardComponent from './components/Board/BoardComponent';
import { setBoard, clearSelected, swapPlayer, clearAvailables, clearChoppedCheckers, restartGame } from './store/reducers/game.reducer';
import { Board } from './components/Board/Board';
import Modal from './UI/Modal/Modal'
import ChoppedCheckers from './components/ChoppedCheckers/ChoppedCheckers';


function App() {
  const selected = useSelector(store => store.game.selectedCell)
  const choppedCheckers = useSelector(store => store.game.choppedCheckers)
  const allChoppedCheckers = useSelector(store => store.game.allChoppedCheckers)
  const currentPlayer = useSelector(store => store.game.currentPlayer)
  const queen = useSelector(store => store.game.queen)
  const dispatch = useDispatch();
  const [endGame,setEndGame] =  useState(false)
  const [winner,setWinner] =  useState(null)
  const board = useSelector(store => store.game.board)

  useEffect(() => {
    dispatch(setBoard(Board()))
  }, []);


  // const highlightCells = () => {
    
  //   let availables = board.map(item => {
  //       return item.map(el => {
  //         if (selected.length > 0) {
  //           const incX = selected[0].x + 1;
  //           const incY = selected[0].y + 1;
  //           const decX = selected[0].x - 1;
  //           const decY = selected[0].y - 1;
  //           const incX2 = selected[0].x + 2;
  //           const incY2 = selected[0].y + 2;
  //           const decX2 = selected[0].x - 2;
  //           const decY2 = selected[0].y - 2;
  
  //           if (selected[0].checkerColor === 'white') {
  //             if (el.x === incX && el.y === decY || el.x === decX && el.y === decY) {
  //               if (el.checkerColor === 'none') {
  //                 el = { ...el, available: true };
  //               } 
  //             }else if (el.x === incX2 && el.y === decY2 || el.x === decX2 && el.y === decY2) {
  //               if (el.checkerColor === 'none') {
  //                 el = { ...el, available: true };
  //               }
  //             }
  //           } else if (selected[0].checkerColor === 'black') {
  //             if (el.x === incX && el.y === incY || el.x === decX && el.y === incY) {
  //               if (el.checkerColor === 'none') {
  //                 el = { ...el, available: true };
  //               } 
  //               }else if (el.x === incX2 && el.y === incY2 || el.x === decX2 && el.y === incY2) {
  //                 if (el.checkerColor === 'none') {
  //                   el = { ...el, available: true };
  //                 }
  //             }
  //           }
  //           return el;
  //         }
  //       })
  
  //   });
    
  //   dispatch(setBoard(availables))
  // }


  useEffect(() => { 
    if (selected.length > 0 && selected.length !== 2) {
      // highlightCells();
      console.log('fuck you');
    } else if (selected.length === 2) {
      const changes = board.map((item) => {
        return item.map((el) => {
          if (el.x === selected[0].x && el.y === selected[0].y) {
            return {
              ...el,
              checkerColor: 'none',
            }
          }
          if (el.x === selected[1].x && el.y === selected[1].y) {
            if(queen?.id === el.id || selected[0].isQueen){
              return {
                  ...selected[1],
                  checkerColor: selected[0].checkerColor,
                  isQueen: true,
                  id: selected[0].id,
              }
            }else{
              return {
                ...selected[1],
                  checkerColor: selected[0].checkerColor,
              }
            }
          }
   
          if (choppedCheckers.length > 0) {
            for (const choppedItem of choppedCheckers) {
              if (choppedItem.x === el.x && choppedItem.y === el.y) {
                return {
                  ...el,
                  checkerColor: "none",
                }
              }
            }
          }
          
          return el;
        })
      });
      dispatch(setBoard(changes))
      dispatch(swapPlayer())
      dispatch(clearSelected())
      dispatch(clearChoppedCheckers())
    }

  }, [selected, choppedCheckers])

  useEffect(() => {
    const white = []
    const black = []
    allChoppedCheckers.forEach(item => {
      if(item.checkerColor === 'black'){
        black.push(item)
      }else if(item.checkerColor === 'white'){
        white.push(item)
      }
    });
    if(white.length === 12){
      setWinner('Black')
      setEndGame(true)
    }else if(black.length === 12){
      setWinner('White')
      setEndGame(true)
    }
  }, [allChoppedCheckers])


  return (
    <div className="App">
    
      <div className='container--left'><ChoppedCheckers/></div>
      <div className='container--main'>{board.length > 0 && <BoardComponent board={board} />}</div>
      {endGame && <Modal show={endGame} close={() => {setEndGame(false) 
        dispatch(restartGame())}}>
        <h1>Game over</h1>
        <h3>Winner: {winner}</h3>
      </Modal>}
    </div>
  );
}

export default App;
