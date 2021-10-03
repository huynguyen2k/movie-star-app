import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cinemaAPI from 'api/cinemaAPI'

export const getShowtimesOfCinemaSystem = createAsyncThunk(
	'cinema/getShowtimesOfCinemaSystem',
	async (data, thunkAPI) => {
		try {
			const response = await cinemaAPI.getShowtimesOfCinemaSystem(data)
			return response.content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const initialState = {
	cinemaSystemList: [],
}

const cinemaSlice = createSlice({
	name: 'cinema',
	initialState,
	reducers: {},
	extraReducers: {
		[getShowtimesOfCinemaSystem.fulfilled]: (state, action) => {
			state.cinemaSystemList = action.payload
		},
	},
})

const { reducer } = cinemaSlice

export default reducer
