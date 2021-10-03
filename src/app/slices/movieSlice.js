import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieAPI from 'api/movieAPI'

export const getMovieList = createAsyncThunk(
	'movie/getMovieList',
	async (data, thunkAPI) => {
		try {
			const response = await movieAPI.getMovieList(data)
			return response.content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const initialState = {
	movieList: [],
}

const movieSlide = createSlice({
	name: 'movie',
	initialState,
	reducers: {},
	extraReducers: {
		[getMovieList.fulfilled]: (state, action) => {
			state.movieList = action.payload
		},
	},
})

const { reducer } = movieSlide

export default reducer
