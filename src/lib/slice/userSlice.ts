import { Files } from "@/types/mediaTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IAuthState {
    authToken: string
    email: string
    userId: number  
}

const initialState: IAuthState = {
    authToken: "",
    email: 'gajmohan@gmail.com',
    userId: 3,
};

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<string>) => {
            state.authToken = action.payload;
        },
        setUserId: (state, action: PayloadAction<number>) => {
            state.userId = action.payload
        },
        setMail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
    },
});

export const {
    setAuthState,
    setMail,
    setUserId,
} = authSlice.actions;
export const authReducer = authSlice.reducer;