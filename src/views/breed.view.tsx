import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from '../app/hooks';
import { AppDispatch, RootState } from '../app/store';
import { add } from '../features/api/breeds.slice';
import { Breed, SubBreed } from '../types/breed';
import { FetchBreed } from '../features/api/breeds.fetcher';
import { CircularProgress } from '@mui/material';
import ElementCardList from '../components/elementCardList.component';
import NotFoundView from './notFound.view';
import SubBreedModal from '../components/subBreedModal.component';

export default function BreedView() {
    const initialBreed: Breed = { name: '', subBreeds: [], images: [] };
    const { breed: targetBreed } = useParams<{ breed: string }>();
    const query = useQuery();
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

    const [modalConfig, setModalConfig] = useState(undefined);

    useEffect(() => {
        breedData();
    }, []);

    useEffect(() => {
        if (query.has('display')) {
            let validTarget: SubBreed = breed.subBreeds.find(
                (subBreed) => subBreed.name === query.get('display')
            );
            setModalConfig({ display: true, target: validTarget });
        } else setModalConfig({ undefined });
    }, [query, breed.subBreeds]);

    const defined = state.length > 0 ? true : false;
    const found = breed.name !== '' ? true : false;
    const body = defined ? (
        found ? (
            <React.Fragment>
                <ElementCardList
                    collection={breed.subBreeds.map((subBreed) => ({
                        ...subBreed,
                        subBreeds: [],
                    }))}
                    displayChip={false}
                    route={`/${breed.name}?display=`}
                />
                {modalConfig.target !== undefined && (
                    <SubBreedModal
                        open={modalConfig.display}
                        subBreed={modalConfig.target}
                    />
                )}
            </React.Fragment>
        ) : (
            <NotFoundView />
        )
    ) : (
        <CircularProgress />
    );

    return <div>{body}</div>;
}
