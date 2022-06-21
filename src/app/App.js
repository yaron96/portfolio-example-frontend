import { Container } from '../shared/ui/Container'
import { Router } from './router'
import { MainProvider } from "./providers"
import { Navbar } from '../shared/ui/Navbar'
import styled from 'styled-components'
import 'antd/dist/antd.css'

export const App = () => {
    return (
        <Styled className='App'>
            <MainProvider>
                <Navbar/>
                <Container>
                    <Router class='App'/>
                </Container>
            </MainProvider>
        </Styled>

    )
}

const Styled = styled.div`
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(2,0,36);
    background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(42,42,126,1) 0%, rgba(0,212,255,1) 100%);
`
