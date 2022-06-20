import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './reducers/game.reducer'

export const store = configureStore({
  reducer: {
	  game: gameReducer,
  },
})