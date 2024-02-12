import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../features/global/globalSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {global: globalState}
export type AppDispatch = typeof store.dispatch;
