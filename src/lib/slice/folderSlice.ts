import { Files, FoldersArray } from "@/types/mediaTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface States {
    viewInfo: boolean,
    infoData: Files,
    files: Files[],
}

const initialState: States = {
    viewInfo: false,
    infoData: {
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
        is_locked: "",
        password: "",
        updated_at: "",
    },
    files: [],
};

export const folderSlice = createSlice({
    name: "folderStates",
    initialState,
    reducers: {
        setViewInfo: (state, action: PayloadAction<boolean>) => {
            state.viewInfo = action.payload
        },
        setInfoData: (state, action: PayloadAction<Files>) => {
            state.infoData = action.payload
        },
        setFiles: (state, action: PayloadAction<Files[]>) => {
            state.files = action.payload
        },
    },
});

export const { setViewInfo, setInfoData, setFiles } = folderSlice.actions;
export const folderReducer = folderSlice.reducer;