import { FoldersArray } from "@/types/mediaTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface States {
    selectedFolders: FoldersArray[]
}

const initialState: States = {
    selectedFolders: []
};

export const folderSlice = createSlice({
    name: "folderStates",
    initialState,
    reducers: {
        setSelectedFolders: (state, action: PayloadAction<FoldersArray[]>) => {
            state.selectedFolders = action.payload
        }
    },
});

export const { setSelectedFolders } = folderSlice.actions;
export const folderReducer = folderSlice.reducer;