import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callAPI } from "../utills/callApi";
import config from "../config";

export const fetchUserData = createAsyncThunk("user/fetchUserData", () =>
  callAPI(config.BASE_URL)
);

const userStore = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
    },
    getUser: (state) => {
      return state.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      console.log(action.payload);
      state.userUrl = action.payload.external_urls?.spotify || "";
      state.name = action.payload.display_name;
      state.isLoading = false;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state = {};
      state.isLoading = false;
    });
  },
});

export const userActions = userStore.actions;

export default userStore;
