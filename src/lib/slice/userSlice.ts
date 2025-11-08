import { Files } from "@/types/mediaTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IAuthState {
    EUID: {
        email: string,
        username: string,
        userId: number
        authToken: string
    }
    parent_id: number | null
}

const initialState: IAuthState = {
    EUID: {
        email: '',
        username: '',
        userId: 0,
        authToken: "",
    },
    parent_id: null
};

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setEUID: (state, action: PayloadAction<{ email: string, username: string, userId: number, authToken: string }>) => {
            state.EUID = action.payload
        },
        setParentId: (state, action: PayloadAction<number | null>) => {
            state.parent_id = action.payload
        }
    },
});

export const {
    setEUID,
    setParentId
} = authSlice.actions;
export const authReducer = authSlice.reducer;