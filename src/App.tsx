import styled from '@emotion/styled';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BreedView from './views/breed.view';
import Home from './views/home.view';
import SubBreedView from './views/subBreed.view';
import NavBar from './components/navBar.component';
import React from 'react';
import { Container } from '@mui/material';

const AppContainer = styled(Container)`
    position: absolute;
    padding: 25px;
    max-height: 92%;
    min-width: 100%;
    overflow-y: auto;
`;

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <NavBar />
                <AppContainer>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/:breed" element={<BreedView />} />
                        <Route
                            path="/:breed/:subBreed"
                            element={<SubBreedView />}
                        />
                    </Routes>
                </AppContainer>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
