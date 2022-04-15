import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Breed, SubBreed } from '../../types/breed';

interface AddPayload {
    value?: Breed;
    values?: Breed[];
}

interface AddSubBreedImagesPayload {
    targetBreed: string;
    collection: SubBreed[];
}

interface SetFavoritePayload {
    favorite: SubBreed;
}

export const breedsSlice: Slice = createSlice({
    name: 'breeds',
    initialState: {
        breeds: [],
        favorite:
            localStorage.getItem('favorite') !== null
                ? JSON.parse(localStorage.getItem('favorite'))
                : undefined,
    },

    reducers: {
        add: (state, action: PayloadAction<AddPayload>) => {
            const isArray: boolean = action.payload.value === undefined;
            if (!isArray) {
                const isDuplicate: Breed = state.breeds.find(
                    (breed: Breed) => breed.name === action.payload.value.name
                );
                if (!isDuplicate)
                    state.breeds = [...state.breeds, action.payload.value];
            } else {
                const newEntries: Breed[] = action.payload.values.filter(
                    (breed: Breed) => {
                        const isDuplicate: Breed = state.breeds.find(
                            (b: Breed) => b.name === breed.name
                        );
                        if (!isDuplicate) return breed;
                        else return null;
                    }
                );
                state.breeds = state.breeds.concat(newEntries);
            }
        },
        addSubBreedImages: (
            state,
            action: PayloadAction<AddSubBreedImagesPayload>
        ) => {
            const validBreed: number = state.breeds.findIndex(
                (breed: Breed) => breed.name === action.payload.targetBreed
            );
            if (validBreed >= 0) {
                state.breeds[validBreed].subBreeds = action.payload.collection;
            }
        },
        setFavorite: (state, action: PayloadAction<SetFavoritePayload>) => {
            if (state.favorite !== undefined) {
                const repeated: boolean =
                    state.favorite.name === action.payload.favorite.name;
                if (!repeated) {
                    state.favorite = action.payload.favorite;
                    localStorage.setItem(
                        'favorite',
                        JSON.stringify(state.favorite)
                    );
                }
            } else {
                state.favorite = action.payload.favorite;
                localStorage.setItem(
                    'favorite',
                    JSON.stringify(state.favorite)
                );
            }
        },
    },
});

export const { add, addSubBreedImages, setFavorite } = breedsSlice.actions;

export default breedsSlice.reducer;
