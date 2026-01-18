"use client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import Loader from "@/app/components/ui/primitives/Loader";

persistStore(store);

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </>
  );
}
