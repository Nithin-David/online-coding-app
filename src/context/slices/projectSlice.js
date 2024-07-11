import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: null,
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    SET_PROJECT: (state, action) => {
      return ({ ...state, project: action.payload });
    },
    SET_PROJECT_NULL: (state) => {
      return ({ ...state, project: null });
    },
  },
});

export const { SET_PROJECT } = projectSlice.actions;
export default projectSlice.reducer;
