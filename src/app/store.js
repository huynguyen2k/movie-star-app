import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import movieReducer from './slices/movieSlice'
import cinemaReducer from './slices/cinemaSlice'
import commentReducer from './slices/commentSlice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		movie: movieReducer,
		cinema: cinemaReducer,
		comment: commentReducer,
	},
})

export default store
