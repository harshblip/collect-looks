import { Files, Folders, FoldersArray, InfoData } from "@/types/mediaTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface States {
    index: number,
    folders: Folders[],
    lockModal: {
        lock: boolean, 
        id: number,
        type: string,
        password: string
    },
    viewFolder: boolean,
    selectedFolders: FoldersArray[],
    folderItems: Files[],
    viewCreateFolder: boolean,
}

const initialState: States = {
    index: 0,
    viewFolder: false,
    selectedFolders: [],
    folderItems: [],
    folders: [],
    lockModal: {
        lock: false,
        id: 0,
        type: '',
        password: ''
    },
    viewCreateFolder: false,
};

export const folderSlice = createSlice({
    name: "folders",
    initialState,
    reducers: {
        setIndex: (state, action: PayloadAction<number>) => {
            state.index = action.payload
        },
        setLockModal: (state, action: PayloadAction<{lock: boolean, id: number, type: string, password: string}>) => {
            state.lockModal = action.payload
        },
        setViewCreateFolder: (state, action: PayloadAction<boolean>) => {
            state.viewCreateFolder = action.payload
        },
        setFolders: (state, action: PayloadAction<Folders[]>) => {
            state.folders = action.payload
        },
        setViewFolder: (state, action: PayloadAction<boolean>) => {
            state.viewFolder = action.payload
        },
        setSelectedFolders: (state, action: PayloadAction<FoldersArray[]>) => {
            state.selectedFolders = action.payload
        },
        setFolderItems: (state, action: PayloadAction<Files[]>) => {
            state.folderItems = action.payload
        },
    },
});

export const { 
    setIndex, 
    setLockModal,  
    setViewCreateFolder, 
    setFolders,
    setFolderItems,
    setViewFolder,
setSelectedFolders } = folderSlice.actions;
export const folderReducer = folderSlice.reducer;