import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  username: string | null;
  error: boolean;
  errorMessage: string | null;
  success: boolean;
  successMessage: string | null;
  roomName: string | null;
  fetchRoom: boolean;
  type: string | null;
  recipientID: string | null;
}

const initialState: GlobalState = {
  username: localStorage.getItem("username"),
  error: false,
  errorMessage: null,
  success: false,
  successMessage: null,
  roomName: null,
  fetchRoom: false,
  type: null,
  recipientID: null,
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
      state.type = action.payload.type;
      state.recipientID = action.payload._id;
    },
    setFetchRoom: (state, action: PayloadAction<boolean>) => {
      state.fetchRoom = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      localStorage.setItem("username", action.payload);
      state.username = action.payload;
    },
    resetRoom: (state) => {
      state.roomName = null;
      state.type = null;
      state.recipientID = null;
    },
    reset: (state) => {
      state.error = false;
      state.errorMessage = null;
      state.success = false;
      state.successMessage = null;
    },
  },
});

export const {
  setError,
  setSuccess,
  setRoom,
  setFetchRoom,
  setUsername,
  reset,
  resetRoom,
} = globalSlice.actions;

export default globalSlice.reducer;
