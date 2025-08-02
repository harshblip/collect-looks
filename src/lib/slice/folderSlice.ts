import { Files, FoldersArray, InfoData } from "@/types/mediaTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface States {
    viewInfo: boolean,
    infoData: InfoData,
    files: Files[],
    index: number,
    viewMedia: boolean,
    viewMediaFiles: Files[]
}

const initialState: States = {
    viewInfo: false,
    infoData: {
        filePath: [],
        image: [
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
                is_locked: "",
                password: "",
                updated_at: "",
            }
        ]
    },
    files: [],
    index: 0,
    viewMedia: false,
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
            is_locked: "",
            password: "",
            updated_at: "",
        }
    ]
};

export const folderSlice = createSlice({
    name: "folderStates",
    initialState,
    reducers: {
        setViewInfo: (state, action: PayloadAction<boolean>) => {
            state.viewInfo = action.payload
        },
        setInfoData: (state, action: PayloadAction<InfoData>) => {
            state.infoData = action.payload
        },
        setFiles: (state, action: PayloadAction<Files[]>) => {
            state.files = action.payload
        },
        setIndex: (state, action: PayloadAction<number>) => {
            state.index = action.payload
        },
        setViewMedia: (state, action: PayloadAction<boolean>) => {
            state.viewMedia = action.payload
        },
        setViewMediaFiles: (state, action: PayloadAction<Files[]>) => {
            state.viewMediaFiles = action.payload
        }
    },
});

export const { setViewInfo, setInfoData, setFiles, setIndex, setViewMedia, setViewMediaFiles } = folderSlice.actions;
export const folderReducer = folderSlice.reducer;