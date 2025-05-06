import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Media = {
    id: string,
    user_id: string,
    created_at: string,
    display_image_url: string,
    file_name: string,
    file_url: string,
    folder_id: string,
    size: string,
    thumbnail_image_url: string
}

export interface StateManager {
    loading: boolean;
    media: Media[]
}

const initialState: StateManager = {
    loading: true,
    media: []
};

export const statesSlice = createSlice({
    name: "states",
    initialState,
    reducers: {
        setLoadingState: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setMedia: (state, action: PayloadAction<Media[]>) => {
            state.media = action.payload
        }
    },
});

export const { setLoadingState, setMedia } = statesSlice.actions;
export const statesReducer = statesSlice.reducer;