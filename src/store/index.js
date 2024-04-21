import { configureStore } from "@reduxjs/toolkit";
import userStore from "./user";
import playlist from "./playlist";
import currentTrackStore from "./currentTrack";

const appStore = configureStore({
  reducer: {
    user: userStore.reducer,
    playlist: playlist,
    currentTrack: currentTrackStore,
  },
});

export default appStore;
