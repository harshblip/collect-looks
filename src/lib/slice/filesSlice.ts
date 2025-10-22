import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Files, Folders, FoldersArray } from "@/types/mediaTypes";

export interface StateManager {
    files: Files[],
    fileModal: boolean,
    viewMediaFiles: Files[],
}

const initialState: StateManager = {
    files: [],
    fileModal: false,
    viewMediaFiles: [
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
    ],
};

export const filesSlice = createSlice({
    name: "files",
    initialState,
    reducers: {
        setFiles: (state, action: PayloadAction<Files[]>) => {
            state.files = action.payload
        },
        setFileModal: (state, action: PayloadAction<boolean>) => {
            state.fileModal = action.payload;
        },
        setViewMediaFiles: (state, action: PayloadAction<Files[]>) => {
            state.viewMediaFiles = action.payload
        }
    },
});

export const {
    setFiles,
    setFileModal,
    setViewMediaFiles,
} = filesSlice.actions;
export const filesReducer = filesSlice.reducer;