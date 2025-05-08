import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Media, Folder } from "@/types/mediaTypes";

export interface StateManager {
    loading: boolean;
    media: Media[],
    folders: Folder[]
}

const initialState: StateManager = {
    loading: true,
    media: [],
    folders: []
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
        },
        setFolders: (state, action: PayloadAction<Folder[]>) => {
            state.folders = action.payload
        }
    },
});

export const { setLoadingState, setMedia, setFolders } = statesSlice.actions;
export const statesReducer = statesSlice.reducer;