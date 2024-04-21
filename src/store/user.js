import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      console.log("inside setUser", action.payload);
      state.user = action.payload;
    },
    getUser: (state) => {
      return state.user;
    },
  },
});

export const userActions = userStore.actions;

export default userStore;
