import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux"
import { authApi } from "shared/api/auth";
import { setIsAuthorized } from "entities/session/slice";
import { TokenStorage } from "shared/lib/token";

export const useRegistration = (email, password) => {
    const dispatch = useDispatch();

    const [error, setError] = useState('');

    const mutation = useMutation(
        authApi.registration,
        {
            onSuccess: (data) => {
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