import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  error: boolean;
  errorMessage: string | null;
  success: boolean;
  successMessage: string | null;
}

const initialState: GlobalState = {
  error: false,
  errorMessage: null,
  success: false,
  successMessage: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = true;
      state.errorMessage = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.success = true;
      state.successMessage = action.payload;
    },
    reset: (state) => {
      state.error = false;
      state.errorMessage = null;
      state.success = false;
      state.successMessage = null;
    },
  },
});

export const { setError, setSuccess, reset } = globalSlice.actions;

export default globalSlice.reducer;
