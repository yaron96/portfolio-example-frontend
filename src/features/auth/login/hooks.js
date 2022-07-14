import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { setIsAuthorized } from "entities/session";
import { authApi } from "shared/api/auth";
import { TokenStorage } from "shared/lib/token";

export const useLogin = (email, password) => {
    const dispatch = useDispatch();

    const [error, setError] = useState('');

    const mutation = useMutation(
        authApi.login,
        {
            onSuccess: (data) => {
                //console.log('onSucess');
                console.log(data)
                TokenStorage.storeToken(data);
                dispatch(setIsAuthorized(true));
            },
            onError: (error) => {
                console.log(error)
            }
        }
    )

    const handleSubmit = () => {
        mutation.mutate({
            email, password
        });
    }

    return {
        handleSubmit,
    }
}