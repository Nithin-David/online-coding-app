import  {createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        SET_USER: (state, action) => {
           return ({...state, user: action.payload})
        },
        SET_USER_NULL: (state) => {
          return ({...state, user: null})
        },
    }
});

export const {SET_USER, SET_USER_NULL} = userSlice.actions;
export default userSlice.reducer;