import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface NewUser {
  id: string;
  email: string;
  avatar: string;
  password?: string;
  username: string;
  isAdmin: boolean;
}

export interface UserProps {
  currentUser: NewUser;
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: UserProps = {
  currentUser: {} as NewUser,
  isFetching: false,
  error: false,
  displayError: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action: PayloadAction<NewUser>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
  },
});
export const { registerStart, registerSuccess, registerFailure } =
  registerSlice.actions;

export default registerSlice.reducer;
