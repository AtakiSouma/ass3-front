import { message, notification } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  ChangePasswordFailed,
  ChangePasswordStart,
  ChangePasswordSuccess,
  UpdateDetailFailure,
  UpdateDetailStart,
  UpdateDetailSuccess,
  UserDetailFailure,
  UserDetailSuccess,
  UserDetailsStart,
} from "../redux/slice/userSlice";
import agent, {
  ChangePasswordParams,
  UIDParams,
  UserProfileParams,
} from "../utils/agents";
import { AxiosError } from "axios";
import { ChangePasswordError } from "../constants/login";
import { ErrorResponse, NavigateFunction } from "react-router-dom";

export function useUserDetail() {
  const state = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // get user Details
  const getUserDetails = async (input: UIDParams) => {
    dispatch(UserDetailsStart());
    try {
      const response = await agent.User.getOneUser(input);
      dispatch(UserDetailSuccess(response));
    } catch (error) {
      console.error("Error fetching Trainee details:", error);
      dispatch(UserDetailFailure());
    }
  };

  const updateUserDetail = async (input: UserProfileParams) => {
    dispatch(UpdateDetailStart());
    try {
      const response = await agent.User.UpdateUserProfile(input);
      dispatch(UpdateDetailSuccess(response));
      message.success("User profile updated Successfully");
    } catch (error) {
      console.error("Error fetching Trainee details:", error);
      dispatch(UpdateDetailFailure());
    }
  };
  const ChangePassword = async (
    input: ChangePasswordParams,
    navigate: NavigateFunction
  ) => {
    dispatch(ChangePasswordStart());
    try {
      const response = await agent.User.changePassword(input);
      dispatch(ChangePasswordSuccess(response));
      message.success("Change Password  Successfully");
      navigate("/update-profile");
    } catch (error: any) {
      console.log("error", error);
      const typedError = error as ErrorResponse;
      const errorMessage = typedError?.data?.error?.message || "Unknown error";
      if (`${errorMessage}` === "Wrong current password") {
        dispatch(ChangePasswordFailed(errorMessage));
        navigate("/users/change-password");
        message.error("Wrong current password");
      } else if (`${errorMessage}` === "Password not matching") {
        dispatch(ChangePasswordFailed(errorMessage));

        message.error("Password not matching , Please check again!!!");
        navigate("/users/change-password");
      }
      dispatch(ChangePasswordFailed(errorMessage));
      navigate("/users/change-password");
    }
  };
  return { state, getUserDetails, updateUserDetail, ChangePassword };
}
