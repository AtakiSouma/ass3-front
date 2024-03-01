import { message, notification } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  UpdateDetailFailure,
  UpdateDetailStart,
  UpdateDetailSuccess,
  UserDetailFailure,
  UserDetailSuccess,
  UserDetailsStart,
} from "../redux/slice/userSlice";
import agent, { UIDParams, UserProfileParams } from "../utils/agents";

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
      message.success("User profile updated Sucessfully");
    } catch (error) {
      console.error("Error fetching Trainee details:", error);
      dispatch(UpdateDetailFailure());
    }
  };
  return { state, getUserDetails, updateUserDetail };
}
