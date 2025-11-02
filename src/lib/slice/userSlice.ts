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
}

const initialState: IAuthState = {
    EUID: {
        email: '',
        username: '',
        userId: 0,
        authToken: "",
    },
};

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setEUID: (state, action: PayloadAction<{ email: string, username: string, userId: number, authToken: string }>) => {
            state.EUID = action.payload
        }
    },
});

export const {
    setEUID
} = authSlice.actions;
export const authReducer = authSlice.reducer;