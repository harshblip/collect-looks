import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Files, Folders, FoldersArray } from "@/types/mediaTypes";

export interface StateManager {
    loading: boolean
    folders: Folders[],
    viewFolder: boolean,
    selectedFolders: FoldersArray[],
    folderItems: Files[],
    fileModal: boolean,
    mode: string,
    email: string,
    searchSuggestions: string[]
}

const initialState: StateManager = {
    loading: true,
    folders: [],
    viewFolder: false,
    selectedFolders: [],
    folderItems: [],
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
        setFileModal: (state, action: PayloadAction<boolean>) => {
            state.fileModal = action.payload;
        },
        setViewFolder: (state, action: PayloadAction<boolean>) => {
            state.viewFolder = action.payload
        },
        setFolderItems: (state, action: PayloadAction<Files[]>) => {
            state.folderItems = action.payload
        },
        setSelectedFolders: (state, action: PayloadAction<FoldersArray[]>) => {
            state.selectedFolders = action.payload
        },
    },
});

export const {
    setLoadingState,
    setFolders,
    setMode,
    setMail,
    setSearchSuggestions,
    setFileModal,
    setViewFolder,
    setFolderItems,
    setSelectedFolders
} = statesSlice.actions;
export const statesReducer = statesSlice.reducer;