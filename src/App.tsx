import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './app/store';
import { add } from './features/breedsApi/breedsSlice';
import { fetchBreeds } from './features/breedsApi/apiMethods';
import { Breed } from './types/breed';
import BreedCard from './components/breedCard';
import { Stack } from '@mui/material';

function App() {
    const breeds = useSelector((state: RootState) => state.breeds.breeds);
    const dispatch = useDispatch<AppDispatch>();

    const breedData = async () => {
        let data: Breed[] = await fetchBreeds();
        if (data) {
            dispatch(add(data));
        } else console.log('error');
    };

    useEffect(() => {
        breedData();
    }, []);

    const breedList = breeds.map((breed: Breed, index: number) => (
        <BreedCard
            key={index}
            name={breed.name}
            subBreeds={breed.subBreeds?.length}
            imageUrl={breed.image}
        />
    ));

    return (
        <div>
            <Stack spacing={1}>{breedList}</Stack>
        </div>
    );
}

export default App;
