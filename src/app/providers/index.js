import { Provider } from 'react-redux'
import { AuthProvider } from './AuthProvider'
import { store } from "app/store"
import { WithQueryClient } from './with-react-query'

export const MainProvider = ({children}) => {
    return (
        <Provider store={store}>
            <WithQueryClient>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </WithQueryClient>
        </Provider>
    )
}
