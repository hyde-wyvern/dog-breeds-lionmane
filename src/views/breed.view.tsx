import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store';
import { add } from '../features/api/breeds.slice';
import { Breed } from '../types/breed';
import { FetchBreed } from '../features/api/breeds.fetcher';
import { CircularProgress } from '@mui/material';
import ElementCardList from '../components/elementCardList.component';
import NotFoundView from './notFound.view';

export default function BreedView() {
    const initialBreed: Breed = { name: '', subBreeds: [], images: [] };
    const { breed: targetBreed } = useParams<{ breed: string }>();
    const state: Breed[] = useSelector(
        (state: RootState) => state.breeds.breeds
    );
    const breed: Breed =
        state.find((breed) => breed.name === targetBreed) || initialBreed;
    const dispatch = useDispatch<AppDispatch>();

    const breedData = async () => {
        const data: Breed = await FetchBreed(
            targetBreed || 'notFound',
            true,
            3
        );
        dispatch(add({ value: data }));
    };
    useEffect(() => {
        breedData();
    }, []);

    const defined = state.length > 0 ? true : false;
    const found = breed.name !== '' ? true : false;

    const body = defined ? (
        found ? (
            <ElementCardList
                collection={breed.subBreeds.map((subBreed) => ({
                    ...subBreed,
                    subBreeds: [],
                }))}
                displayChip={false}
            />
        ) : (
            <NotFoundView />
        )
    ) : (
        <CircularProgress />
    );

    return <div>{body}</div>;
}
