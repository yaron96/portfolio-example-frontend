import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
    clearUser,
    getCurrentUserThunk,
    initSession,
    useIsAuthorized,
    useIsSessionInited,
} from 'entities/session'

export const AuthProvider = ({children}) => {
    const dispatch = useDispatch()
    const isAuthorized = useIsAuthorized();
    const isSessionInited = useIsSessionInited();

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
