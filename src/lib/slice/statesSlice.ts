import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Media, Folder } from "@/types/mediaTypes";

export interface StateManager {
    loading: boolean
    media: Media[],
    folders: Folder[],
    mode: string,
    email: string
}

const initialState: StateManager = {
    loading: true,
    media: [],
    folders: [],
    mode: "signup",
    email: 'gajmohan@gmail.com'
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
        },
        setMode: (state, action: PayloadAction<string>) => {
            state.mode = action.payload
        },
        setMail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        }
    },
});

export const { setLoadingState, setMedia, setFolders, setMode, setMail } = statesSlice.actions;
export const statesReducer = statesSlice.reducer;