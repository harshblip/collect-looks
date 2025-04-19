import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IAuthState {
    authToken: string;
}

const initialState: IAuthState = {
    authToken: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<string>) => {
            state.authToken = action.payload;
        },
    },
});

export const { setAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;