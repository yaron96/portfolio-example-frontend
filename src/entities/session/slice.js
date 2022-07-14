import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "shared/api/user"
import { authApi } from "shared/api/auth";
import { TokenStorage } from "shared/lib/token";

const initialState = {
    user: null,
    isAuthorized: false,
    isSessionInited: false,
};

export const sessionSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        setIsAuthorized: (state, action) => {
            state.isAuthorized = action.payload;
        },
        sessionInited: (state) => {
            state.isSessionInited = true;
        },
    },
});

export const initSession = createAsyncThunk(
    "auth/init",
    async (_, { dispatch }) => {
        TokenStorage.getToken() && dispatch(setIsAuthorized(true));
        dispatch(sessionInited());
        return;
    }
);

export const getCurrentUserThunk = createAsyncThunk(
    "user/me",
    async (_, thunkApi) => {
        const user = await userApi.getCurrentUser();
        thunkApi.dispatch(setUser(user));
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/login",
    async (_, thunkApi) => {
        authApi.logout();
        TokenStorage.clear();
        thunkApi.dispatch(setIsAuthorized(false));
    }
);

export const { setUser, clearUser, setIsAuthorized, sessionInited } =
    sessionSlice.actions;
