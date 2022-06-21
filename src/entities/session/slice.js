import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isAuthorized: false,
    isSessionInited: false
}

export const sessionSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null
        },
        setIsAuthorized: (state, action) => {
            state.isAuthorized = action.payload
        },
        sessionInited: (state) => {
            state.isSessionInited = true
        },
    },
})

export const initSession = createAsyncThunk(
    'auth/init',
    async(_, { dispatch } ) => {
        localStorage.getItem('token') && dispatch(setIsAuthorized(true))
        dispatch(sessionInited())
        return
    }
)

export const getCurrentUserThunk = createAsyncThunk(
    'users/me',
    async (_, thunkApi ) => {
        const user = {}//
    }
)

export const { clearUser, setIsAuthorized, sessionInited } = sessionSlice.actions
