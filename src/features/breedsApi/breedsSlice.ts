import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Breed } from '../../types/breed';

export const breedsSlice: Slice = createSlice({
    name: 'breeds',
    initialState: {
        breeds: [],
    },

    reducers: {
        add: (state, action: PayloadAction<Breed[]>) => {
            action.payload.forEach((breed) => {
                if (!state.breeds.includes(breed)) state.breeds.push(breed);
            });
        },
        remove: (state, action: PayloadAction<Breed[]>) => {
            action.payload.forEach((breed) => {
                if (state.breeds.includes(breed)) state.breeds.remove(breed);
            });
        },
    },
});

export const { add, remove } = breedsSlice.actions;

export default breedsSlice.reducer;
