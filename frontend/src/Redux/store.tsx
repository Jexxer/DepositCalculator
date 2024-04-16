import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/Redux/Slices/UserSlice";
import portfolioReducer from "@/Redux/Slices/PortfolioSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    portfolio: portfolioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
