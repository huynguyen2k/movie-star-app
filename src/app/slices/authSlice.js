import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authAPI from 'api/authAPI'
import history from 'utils/history'

export const register = createAsyncThunk(
	'auth/register',
	async (payload, thunkAPI) => {
		try {
			const response = await authAPI.register(payload)
			return response.message
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data?.content)
		}
	}
)

export const login = createAsyncThunk(
	'auth/login',
	async (payload, thunkAPI) => {
		try {
			const {
				content: { accessToken, ...user },
			} = await authAPI.login(payload)

			localStorage.setItem('user', JSON.stringify(user))
			localStorage.setItem('accessToken', accessToken)

			return user
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data?.content)
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: JSON.parse(localStorage.getItem('user')),
		loggedIn: !!JSON.parse(localStorage.getItem('user')),
	},
	reducers: {
		logout: (state, action) => {
			state.user = null
			state.loggedIn = false

			localStorage.removeItem('user')
			localStorage.removeItem('accessToken')

			history.replace('/')
		},
	},
	extraReducers: {
		[login.fulfilled]: (state, action) => {
			state.user = action.payload
			state.loggedIn = true
		},
	},
})

const { reducer, actions } = authSlice
export const { logout } = actions

export default reducer
