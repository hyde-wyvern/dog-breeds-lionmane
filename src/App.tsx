import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BreedView from './views/breed.view';
import Home from './views/home.view';
import SubBreedView from './views/subBreed.view';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:breed" element={<BreedView />} />
                <Route path="/:breed/:subBreed" element={<SubBreedView />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
