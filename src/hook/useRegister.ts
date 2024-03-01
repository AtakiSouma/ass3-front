import { NavigateFunction } from "react-router-dom";
import { ILoginParams, IRegisterParams } from "../constants/data";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import baseApi from "../utils/baseApi";
import { AxiosError } from "axios";
import { registerFailure, registerStart } from "../redux/slice/registerSlice";
import { RegisterError } from "../constants/register";

export function useRegister() {
  const state = useAppSelector((state) => state.register);
  const dispatch = useAppDispatch();

  const handleRegister = async (
    input: IRegisterParams,
    navigate: NavigateFunction
  ) => {
    // start
    dispatch(registerStart());
    // process
    try {
    await baseApi.post(`/api/user/register`, {
       username: input.username,
        email: input.email,
        password: input.password,
        confirmPassword:input.confirmPassword
      });
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.error?.message;
        if (errorResponse in RegisterError) {
          const translatedError =
            RegisterError[errorResponse as keyof typeof RegisterError];
          dispatch(registerFailure(translatedError));
        } else {
          dispatch(registerFailure(errorResponse));
        }
      } else {
        dispatch(registerFailure("Đã có lỗi xảy ra"));
      }
    }
  };
  return { state, handleRegister };
}
