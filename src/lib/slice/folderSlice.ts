import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface States {
    selectedFolders: string[]    
}

const initialState: States = {
    selectedFolders: ['']
};

export const folderSlice = createSlice({
    name: "folderStates",
    initialState,
    reducers: {
        setSelectedFolders: (state, action: PayloadAction<string[]>) => {
            state.selectedFolders = action.payload
        }
    },
});

export const { setSelectedFolders } = folderSlice.actions;
export const folderReducer = folderSlice.reducer;