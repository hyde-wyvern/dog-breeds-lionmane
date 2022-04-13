import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { add } from '../features/api/breeds.slice';
import { FetchAllBreeds } from '../features/api/breeds.fetcher';
import { Breed } from '../types/breed';
import { CircularProgress } from '@mui/material';
import ElementCardList from '../components/elementCardList.component';
import PetsIcon from '@mui/icons-material/Pets';

export default function HomeView() {
    const state: Breed[] = useSelector(
        (state: RootState) => state.breeds.breeds
    );
    const dispatch = useDispatch<AppDispatch>();

    const breedData = async () => {
        const data: Breed[] = await FetchAllBreeds(true);
        if (data) {
            dispatch(add({ values: data }));
        } else console.log('error');
    };

    useEffect(() => {
        breedData();
    }, []);

    const body =
        state.length > 0 ? (
            <ElementCardList
                collection={state}
                displayChip={true}
                route={''}
                icon={<PetsIcon />}
            />
        ) : (
            <CircularProgress />
        );

    return <div>{body}</div>;
}
