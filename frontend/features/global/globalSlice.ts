import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  error: boolean;
  errorMessage: string | null;
  success: boolean;
  successMessage: string | null;
  roomName: string | null;
  fetchRoom: boolean;
  type: string | null;
}

const initialState: GlobalState = {
  error: false,
  errorMessage: null,
  success: false,
  successMessage: null,
  roomName: null,
  fetchRoom: false,
  type: null,
};

interface RoomAction {
  type: string;
  roomName: string;
  _id: string;
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      console.log(action);
      state.error = true;
      state.errorMessage = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.success = true;
      state.successMessage = action.payload;
    },
    setRoom: (state, action: PayloadAction<RoomAction>) => {
      state.roomName = action.payload.roomName;
    },
    setFetchRoom: (state, action: PayloadAction<boolean>) => {
      state.fetchRoom = action.payload;
    },
    reset: (state) => {
      state.error = false;
      state.errorMessage = null;
      state.success = false;
      state.successMessage = null;
    },
    resetRoom: (state) => {
      state.roomName = null;
    },
  },
});

export const { setError, setSuccess, setRoom, setFetchRoom, reset } =
  globalSlice.actions;

export default globalSlice.reducer;
