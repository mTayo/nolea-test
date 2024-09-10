import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface GlobalStates {
  isSignedIn: boolean
}

// Define the initial state using that type
const initialState: GlobalStates = {
  isSignedIn: false,
};

export const globalStateSlice = createSlice({
  name: "globalStates",
  initialState,
  reducers: {
    setIsSiginIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
      return state;
    },
  
  },
});

export const { setIsSiginIn } = globalStateSlice.actions;

export default globalStateSlice.reducer;
