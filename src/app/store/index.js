import { sessionSlice } from '../../entities/session/slice'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        session: sessionSlice.reducer,
    },
})


