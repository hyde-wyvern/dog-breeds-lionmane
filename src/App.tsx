import styled from '@emotion/styled';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import BreedView from './views/breed.view';
import Home from './views/home.view';
import NavBar from './components/navBar.component';
import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import {} from 'react-router-dom';

const AppContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 95%;
    padding: 10px 0px 10px 0px;
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
                    </Routes>
                </AppContainer>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
