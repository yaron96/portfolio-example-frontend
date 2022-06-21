import { useSelector } from "react-redux";

export const useIsAuthorized = () => 
    useSelector((state) => !!state.session.isAuthorized)