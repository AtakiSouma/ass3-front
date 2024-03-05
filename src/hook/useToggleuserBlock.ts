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
import { ToggleBlockUserFailed, ToggleBlockUserStart, ToggleBlockUserSuccess } from "../redux/slice/UserManagement'Slice.";

export function useToggleuserBlock() {
  const state = useAppSelector((state) => state.customer);
  const dispatch = useAppDispatch();


  const toggleUserBlock = async (uid: string) => {
    dispatch(ToggleBlockUserStart());
    try {
      await agent.User.ToggleBlockUser(uid);
      dispatch(ToggleBlockUserSuccess());
      message.success("User Change Status Successfully");
    } catch (error) {
      dispatch(ToggleBlockUserFailed());
      message.error("User Change Status Failed");

    }
  };
 
  return { state,toggleUserBlock };
}
