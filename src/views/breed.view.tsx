import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from '../app/hooks';
import { AppDispatch, RootState } from '../app/store';
import { add, addSubBreedImages } from '../features/api/breeds.slice';
import { Breed, SubBreed } from '../types/breed';
import {
    FetchApiImage,
    FetchBreed,
    ProvideImages,
} from '../features/api/breeds.fetcher';
import ElementCardList from '../components/elementCardList.component';
import NotFoundView from './notFound.view';
import SubBreedModal from '../components/subBreedModal.component';
import { Box } from '@mui/system';
import BreedHeader from '../components/breedHeader.component';
import { CircularProgress } from '@mui/material';

export default function BreedView() {
    const { breed: targetBreed } = useParams<{ breed: string }>();
    const query = useQuery();
    const state: Breed = useSelector((state: RootState) =>
        state.breeds.breeds.find((breed: Breed) => breed.name === targetBreed)
    );
    const dispatch = useDispatch<AppDispatch>();

    const breedData = useCallback(async () => {
        const data: Breed = await FetchBreed(
            targetBreed || 'notFound',
            true,
            3
        );
        data.images = await FetchApiImage(data.name);
        dispatch(add({ value: data }));
    }, [dispatch, targetBreed]);

    const imageData = useCallback(async () => {
        const updatedCollection: SubBreed[] = await ProvideImages(
            state.subBreeds,
            state.name,
            3
        );
        dispatch(
            addSubBreedImages({
                targetBreed: state.name,
                collection: updatedCollection,
            })
        );
    }, [state, dispatch]);

    const [modalDisplay, setModalDisplay] = useState({
        value: false,
        target: undefined,
    });
    const [displayStatus, setDisplayStatus] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isMissing = state === undefined;
        if (isMissing) breedData();
        else if (
            state.subBreeds.length > 0 &&
            state.subBreeds[0].images.length < 1
        )
            imageData();
        else setLoading(false);
        setDisplayStatus(!isMissing);
    }, [state, breedData, imageData]);

    useEffect(() => {
        if (displayStatus && query.has('display')) {
            const validTarget = state.subBreeds.find(
                (subBreed: SubBreed) => subBreed.name === query.get('display')
            );
            if (validTarget !== undefined)
                setModalDisplay({ value: true, target: validTarget });
        } else setModalDisplay({ value: false, target: undefined });
    }, [query, displayStatus, state]);

    const body = displayStatus ? (
        <React.Fragment>
            <Box sx={{ marginBottom: '25px' }}>
                <BreedHeader breed={state} />
            </Box>
            {state.subBreeds && (
                <ElementCardList
                    collection={state.subBreeds.map((subBreed: SubBreed) => ({
                        ...subBreed,
                        subBreeds: [],
                    }))}
                    displayChip={false}
                    route={`/${state.name}?display=`}
                />
            )}
            {modalDisplay.target !== undefined && (
                <SubBreedModal
                    open={modalDisplay.value}
                    subBreed={modalDisplay.target}
                />
            )}
        </React.Fragment>
    ) : (
        <NotFoundView />
    );

    return <div>{loading ? <CircularProgress /> : body}</div>;
}
