import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/features/authSlice";
import modalSlice from "@/redux/features/modalSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
