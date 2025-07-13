import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Files } from "@/types/mediaTypes";

export interface StateManager {
    loading: boolean
    folders: Files[],
    mode: string,
    email: string,
    searchSuggestions: string[]
}

const initialState: StateManager = {
    loading: true,
    folders: [],
    mode: "signup",
    email: 'gajmohan@gmail.com',
    searchSuggestions: []
};

export const statesSlice = createSlice({
    name: "states",
    initialState,
    reducers: {
        setLoadingState: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setFolders: (state, action: PayloadAction<Files[]>) => {
            state.folders = action.payload
        },
        setMode: (state, action: PayloadAction<string>) => {
            state.mode = action.payload
        },
        setMail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setSearchSuggestions: (state, action: PayloadAction<string[]>) => {
            state.searchSuggestions = action.payload
        }
    },
});

export const { setLoadingState, setFolders, setMode, setMail, setSearchSuggestions } = statesSlice.actions;
export const statesReducer = statesSlice.reducer;