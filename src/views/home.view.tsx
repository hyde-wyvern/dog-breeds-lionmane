import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { add } from '../features/api/breeds.slice';
import { FetchAllBreeds } from '../features/api/breeds.fetcher';
import { Breed, SubBreed } from '../types/breed';
import { CircularProgress } from '@mui/material';
import ElementCardList from '../components/elementCardList.component';
import PetsIcon from '@mui/icons-material/Pets';
import EmptyCard from '../components/emptyCard.component';
import SectionHeader from '../components/sectionHeader.component';
import ScrollableContainer from '../components/scrollableContainer.component';
import { useState } from 'react';
import ElementCard from '../components/elementCard.component';

export default function HomeView() {
    const state: Breed[] = useSelector(
        (state: RootState) => state.breeds.breeds
    );
    const favorite: SubBreed = useSelector(
        (state: RootState) => state.breeds.favorite
    );
    const dispatch = useDispatch<AppDispatch>();
    const [hasFavorite, setHasFavorite] = useState(false);

    const breedData = useCallback(async () => {
        const data: Breed[] = await FetchAllBreeds(true);
        if (data) {
            dispatch(add({ values: data }));
        } else console.log('error');
    }, [dispatch]);

    useEffect(() => {
        if (state.length <= 1) breedData();
    }, [breedData, state.length]);

    useEffect(() => {
        if (favorite === null || favorite === undefined) {
            setHasFavorite(false);
        } else {
            setHasFavorite(true);
        }
    }, [favorite]);

    const body =
        state.length > 0 ? (
            <ElementCardList
                collection={state}
                displayChip={true}
                route={''}
                icon={<PetsIcon fontSize="small" />}
            />
        ) : (
            <CircularProgress />
        );

    return (
        <React.Fragment>
            <SectionHeader title="Favorite Breed" icon={<PetsIcon />} />
            {hasFavorite ? (
                <ElementCard
                    imageUrl={favorite.images[0]}
                    title={favorite.name}
                    alt={`${favorite.name} dog`}
                    displayChip={false}
                    route={'/'}
                />
            ) : (
                <EmptyCard message="You don't have a favorite breed yet." />
            )}
            <SectionHeader title="Breeds" icon={<PetsIcon />} />
            <ScrollableContainer>{body}</ScrollableContainer>
        </React.Fragment>
    );
}
