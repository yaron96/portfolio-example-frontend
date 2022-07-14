import { Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes'
import { useIsAuthorized } from 'entities/session'

export const Router = () => {
    const isAuthorized = useIsAuthorized()

    return (
        isAuthorized
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        element={<route.component />}
                        path={route.path}
                    />
                )}
                <Route
                    path="*"
                    element={<Navigate to="/admin" />}
                />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        element={<route.component />}
                        path={route.path}
                    />
                )}
                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />
            </Routes>
    )
}
