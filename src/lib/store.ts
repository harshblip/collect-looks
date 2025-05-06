import { authReducer } from "./slice/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { statesReducer } from "./slice/statesSlice";

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["auth", "states"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    states: statesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;