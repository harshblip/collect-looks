'use client'
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from './store'

persistStore(store);

export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        </>
    );
}