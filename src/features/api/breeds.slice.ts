import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Breed, SubBreed } from '../../types/breed';

interface AddPayload {
    value?: Breed;
    values?: Breed[];
}

interface GetSubBreedImagesPayload {
    targetBreed: string;
    collection: SubBreed[];
}

export const breedsSlice: Slice = createSlice({
    name: 'breeds',
    initialState: {
        breeds: [],
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
            action: PayloadAction<GetSubBreedImagesPayload>
        ) => {
            const validBreed: number = state.breeds.findIndex(
                (breed: Breed) => breed.name === action.payload.targetBreed
            );
            if (validBreed >= 0) {
                state.breeds[validBreed].subBreeds = action.payload.collection;
            }
        },
    },
});

export const { add, addSubBreedImages } = breedsSlice.actions;

export default breedsSlice.reducer;
