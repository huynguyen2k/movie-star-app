import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './slices/movieSlice'
import cinemaReducer from './slices/cinemaSlice'

const store = configureStore({
	reducer: {
		movie: movieReducer,
		cinema: cinemaReducer,
	},
})

export default store
