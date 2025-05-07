import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Media } from "@/types/mediaTypes";

export interface StateManager {
    loading: boolean;
    media: Media[]
}

const initialState: StateManager = {
    loading: true,
    media: []
};

export const statesSlice = createSlice({
    name: "states",
    initialState,
    reducers: {
        setLoadingState: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setMedia: (state, action: PayloadAction<Media[]>) => {
            state.media = action.payload
        }
    },
});

export const { setLoadingState, setMedia } = statesSlice.actions;
export const statesReducer = statesSlice.reducer;