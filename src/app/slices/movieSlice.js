import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieAPI from 'api/movieAPI'
import random from 'utils/random'

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

export const getMovieInfo = createAsyncThunk(
	'movie/getMovieInfo',
	async (data, thunkAPI) => {
		try {
			const { content } = await movieAPI.getMovieInfo(data)
			content.tuoi = random(12, 18)
			content.thoiLuong = random(90, 130)

			return content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const initialState = {
	movieList: [],
	movieInfo: null,
}

const movieSlide = createSlice({
	name: 'movie',
	initialState,
	reducers: {},
	extraReducers: {
		[getMovieList.fulfilled]: (state, action) => {
			state.movieList = action.payload
		},
		[getMovieInfo.fulfilled]: (state, action) => {
			state.movieInfo = action.payload
		},
	},
})

const { reducer } = movieSlide

export default reducer
