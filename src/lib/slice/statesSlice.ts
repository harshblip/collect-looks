import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Files, Folders } from "@/types/mediaTypes";

export interface StateManager {
    loading: boolean
    folders: Folders[],
    files: Files[],
    viewFolder: boolean,
    fileModal: boolean,
    mode: string,
    email: string,
    searchSuggestions: string[]
}

const initialState: StateManager = {
    loading: true,
    folders: [],
    files: [],
    viewFolder: false,
    fileModal: false,
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
        setFolders: (state, action: PayloadAction<Folders[]>) => {
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
        },
        setFiles: (state, action: PayloadAction<Files[]>) => {
            state.files = action.payload
        },
        setFileModal: (state, action: PayloadAction<boolean>) => {
            state.fileModal = action.payload;
        },
        setViewFolder: (state, action: PayloadAction<boolean>) => {
            state.viewFolder = action.payload
        }
    },
});

export const {
    setLoadingState,
    setFolders,
    setMode,
    setMail,
    setSearchSuggestions,
    setFiles,
    setFileModal,
    setViewFolder
} = statesSlice.actions;
export const statesReducer = statesSlice.reducer;