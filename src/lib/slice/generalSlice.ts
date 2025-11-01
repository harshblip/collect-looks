import { Files, InfoData } from "@/types/mediaTypes"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface GeneralState {
    mode: string
    searchSuggestions: (string | Files)[]
    viewInfo: boolean
    infoData: InfoData
    viewMedia: boolean
    viewLockModal: boolean
    searchQuery: string
}

const initialState: GeneralState = {
    viewMedia: false,
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
                is_locked: false,
                password: "",
                updated_at: "",
                total_count: 0
            }
        ]
    },
    viewLockModal: false,
    searchQuery: '',
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
    ],
    mode: "signup",
}

export const generalSlice = createSlice({
    name: "utility",
    initialState,
    reducers: {
        setSearchSuggestions: (state, action: PayloadAction<(string | Files)[]>) => {
            state.searchSuggestions = action.payload
        },
        setMode: (state, action: PayloadAction<string>) => {
            state.mode = action.payload
        },
        setViewLockModal: (state, action: PayloadAction<boolean>) => {
            state.viewLockModal = action.payload
        },
        setViewInfo: (state, action: PayloadAction<boolean>) => {
            state.viewInfo = action.payload
        },
        setInfoData: (state, action: PayloadAction<InfoData>) => {
            state.infoData = action.payload
        },
        setViewMedia: (state, action: PayloadAction<boolean>) => {
            state.viewMedia = action.payload
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
        }
    }
})

export const {
    setMode,
    setSearchSuggestions,
    setViewMedia,
    setViewInfo,
    setInfoData,
    setViewLockModal,
    setSearchQuery
} = generalSlice.actions

export const generalReducer = generalSlice.reducer;