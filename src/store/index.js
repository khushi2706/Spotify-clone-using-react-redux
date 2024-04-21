import { configureStore } from "@reduxjs/toolkit";
import userStore from "./user";

const appStore = configureStore({
  reducer: {
    user: userStore.reducer,
  },
});

export default appStore;
