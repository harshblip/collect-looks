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
    parent_id: number | null,
    resetMail: string
}

const initialState: IAuthState = {
    EUID: {
        email: '',
        username: '',
        userId: 0,
        authToken: "",
    },
    parent_id: null,
    resetMail: ''
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
        },
        resetEUID: (state) => {
            state.EUID = initialState.EUID;
        },
        setResetMail: (state, action: PayloadAction<string>) => {
            state.resetMail = action.payload;
        }
    },
});

export const {
    setEUID,
    setParentId,
    resetEUID,
    setResetMail
} = authSlice.actions;
export const authReducer = authSlice.reducer;