import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IAuthState {
    authToken: string;
    userId: number
}

const initialState: IAuthState = {
    authToken: "",
    userId: -1
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<string>) => {
            state.authToken = action.payload;
        },
        setUserID: (state, action: PayloadAction<number>) => {
            state.userId = action.payload;
        }
    },
});

export const { setAuthState, setUserID } = authSlice.actions;
export const authReducer = authSlice.reducer;