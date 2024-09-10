import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import IUser from "models/IUser";

// Define a type for the slice state
export interface UserSliceState {
  user: IUser | null;
  loading: boolean;
}

// Define the initial state using that type
const initialState: UserSliceState = {
  user: {},
  loading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.loading = false;
      return state;
    },

    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      return state;
    }
    
  }
});

export const { setUser, setUserLoading } = userSlice.actions;

export default userSlice.reducer;
