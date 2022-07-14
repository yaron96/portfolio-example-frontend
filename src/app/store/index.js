import { sessionSlice } from 'entities/session/slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        session: sessionSlice.reducer,
    },
})


