import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { newsArray } from "data";
import INews from "models/INews";


// Define a type for the slice state
export interface NewsSliceState {
  newsList:  Array<INews>;
  loading: boolean;
}

// Define the initial state using that type
const initialState: NewsSliceState = {
  newsList: newsArray,
  loading: true,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<any>) => {
      state.newsList = [
          ...state.newsList,
          action.payload
      ];
      state.loading = false;
      return state;
    },

    setNewsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      return state;
    }
    
  }
});

export const { setNews, setNewsLoading } = newsSlice.actions;

export default newsSlice.reducer;
