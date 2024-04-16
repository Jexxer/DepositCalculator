import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: boolean | null;
}

const initialState: UserState = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    },
  },
});

export const { loginSuccess } = userSlice.actions;

export default userSlice.reducer;
