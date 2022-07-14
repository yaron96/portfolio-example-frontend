import { useSelector } from "react-redux";

export const useIsAuthorized = () => 
    useSelector((state) => !!state.session.isAuthorized)

export const useIsSessionInited = () => 
    useSelector((state) => !!state.session.isSessionInited)

export const useUser = () => 
    useSelector((state) => state.session.user)