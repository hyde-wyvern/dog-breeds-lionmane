import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Breed } from '../../types/breed';

interface AddPayload {
    value?: Breed;
    values?: Breed[];
}

export const breedsSlice: Slice = createSlice({
    name: 'breeds',
    initialState: {
        breeds: [],
    },

    reducers: {
        add: (state, action: PayloadAction<AddPayload>) => {
            if (action.payload.value) {
                state.breeds.push(action.payload.value);
            } else if (action.payload.values) {
                action.payload.values.forEach((breed) => {
                    if (!state.breeds.includes(breed)) state.breeds.push(breed);
                });
            }
        },
    },
});

export const { add, remove } = breedsSlice.actions;

export default breedsSlice.reducer;
