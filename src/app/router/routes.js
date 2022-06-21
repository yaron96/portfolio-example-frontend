import { AdminPage } from '../../pages/admin'
import { AuthPage } from '../../pages/auth'

export const privateRoutes = [
    { path: '/admin', component: AdminPage }
]

export const publicRoutes = [
    { path: '/login', component: AuthPage },
] 
