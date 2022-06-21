import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { base_url } from '../../shared/api/http-client'
import {
    clearUser,
    getCurrentUserThunk,
    initSession,
} from '../../entities/session'

export const AuthProvider = ({children}) => {
    const dispatch = useDispatch()
    const isSessionInited = useSelector(state => state.session.isSessionInited)
    const isAuthorized = useSelector(state => state.session.isAuthorized)

//    useEffect(async() => {
//        try {
//            if(localStorage.getItem('token')) {
//                const response = await axios.get(`${base_url}/refresh`, {withCredentials: true})
//                localStorage.setItem('token', response.data.accessToken)
//                dispatch({type: 'SET_USER', payload: response.data.user})
//                dispatch({type: 'SET_IS_AUTHORIZED', payload: true})
//            }
//        } catch (e) {
//            console.log(e.response?.data?.message)
//        } finally {
//            dispatch({type: 'SESSION_INITED'})
//        }
//    }, [])

    useEffect(() => {
        dispatch(initSession())
    }, [])

    useEffect(() => {
        if (isAuthorized) {
            dispatch(getCurrentUserThunk())
        } else {
            dispatch(clearUser())
        }
    }, [isAuthorized])

    if (!isSessionInited) {
        return null
    }

    return <>{children}</>
}
