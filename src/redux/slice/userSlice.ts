import { PayloadAction, createSlice } from "@reduxjs/toolkit";





interface User{
    uid: string;
    email:string;
    username:string;
    gender:string;
    phoneNumber:string;
    avatar:string;

}
export interface UserDetail {
    currentUser: User;
    updateUser:User;
    isFetching:boolean;
    error:boolean;
}
const initialState: UserDetail = {
    currentUser: {} as User,
    updateUser: {} as User,
    isFetching: false,
    error: false,
  };
  const TraineeDetailSlice = createSlice({
    name: 'userDetail',
    initialState,
    reducers: {
      UserDetailsStart: (state) => {
        state.isFetching = true;
      },
      UserDetailSuccess: (state, action: PayloadAction<User>) => {
        state.isFetching = false;
        state.currentUser = action.payload;
        state.error = false;
      },
      UserDetailFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
      UpdateDetailStart: (state) => {
        state.isFetching = true;
      },
      UpdateDetailSuccess: (state, action: PayloadAction<User>) => {
        state.isFetching = false;
        state.currentUser = action.payload;
        state.error = false;
      },
      UpdateDetailFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
    },
  });
  
  export const { UserDetailsStart, UserDetailSuccess, UserDetailFailure, UpdateDetailStart, UpdateDetailSuccess, UpdateDetailFailure} =
    TraineeDetailSlice.actions;
  
  export default TraineeDetailSlice.reducer;
  