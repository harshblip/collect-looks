import { authReducer } from "./slice/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { filesReducer } from "./slice/filesSlice";
import { folderReducer } from "./slice/folderSlice";
import { generalReducer } from "./slice/generalSlice";

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["user", "utility"],
};

const rootReducer = combineReducers({
    user: authReducer,
    files: filesReducer,
    folders: folderReducer,
    utility: generalReducer
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