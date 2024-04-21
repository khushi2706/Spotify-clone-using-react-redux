import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../config";
import { callAPI } from "../utills/callApi";

export const fetchCurrentTrack = createAsyncThunk(
  "currentTrack/fetchCurrentTrack",
  () => callAPI(config.BASE_URL + "/player/currently-playing")
);

const currentTrackStore = createSlice({
  name: "currentTrack",
  initialState: {
    currentTrack: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentTrack.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCurrentTrack.fulfilled, (state, action) => {
      const response = action.payload;
      
      if (response !== "") {
        state.id = response.item.id;
        state.name = response.item.name;
        state.artists = response.item.artists.map((artist) => artist.name);
        state.image = response.item.album.images[0].url;
        state.isLoading = false;
      }
    });
    builder.addCase(fetchCurrentTrack.rejected, (state, action) => {
      state.currentTrack = null;
      state.isLoading = false;
    });
  },
});

export default currentTrackStore.reducer;
