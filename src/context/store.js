import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import projectReducer from "./slices/projectSlice";
import searchTermReducer from "./slices/searchTermSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectReducer,
    searchTerm: searchTermReducer,
  },
});
