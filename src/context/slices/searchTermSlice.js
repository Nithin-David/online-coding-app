
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

export const searchTermSlice = createSlice({
  name: "searchTerm",
  initialState,
  reducers: {
    SET_SEARCH_TERM: (state, action) => {
      return { ...state, searchTerm: action.payload };
    },
    SET_SEARCH_TERM_NULL: (state) => {
      return { ...state, searchTerm: "" };
    },
  },
});

export const { SET_SEARCH_TERM } = searchTermSlice.actions;
export default searchTermSlice.reducer;
