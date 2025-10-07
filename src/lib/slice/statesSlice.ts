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
    userId: number,
    searchSuggestions: Files[]
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
    userId: 3,
    searchSuggestions: [
        {
            id: 0,
            user_id: 0,
            file_name: "",
            file_url: "",
            file_type: "",
            size: "",
            created_at: "",
            starred: "",
            is_trashed: "",
            folder_id: 0,
            description: "",
            is_locked: false,
            password: "",
            updated_at: "",
            total_count: 0
        }
    ]
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
        setSearchSuggestions: (state, action: PayloadAction<Files[]>) => {
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
        setUserId: (state, action: PayloadAction<number>) => {
            state.userId = action.payload
        }
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
    setUserId,
    setSelectedFolders
} = statesSlice.actions;
export const statesReducer = statesSlice.reducer;