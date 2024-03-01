import { NavigateFunction } from "react-router-dom";
import { ICreateOrchidParams } from "../constants/data";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  createOrchidFailed,
  createOrchidStart,
  createOrchidSuccess,
} from "../redux/slice/createOrchid";
import agent from "../utils/agents";
import { AxiosError } from "axios";
import { CreateOrchidError } from "../constants/createOrchid";

export function useCreateOrchid() {
  const state = useAppSelector((state) => state.createOrchid);
  const dispatch = useAppDispatch();

  const handleCreateOrchid = async (
    input: ICreateOrchidParams,
    navigate: NavigateFunction
  ) => {
    dispatch(createOrchidStart());
    try {
      const newOrchid = await agent.Orchid.createOrchid(input);
      dispatch(createOrchidSuccess(newOrchid));
      navigate("/orchid");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data?.error?.message;
        if (errorResponse in CreateOrchidError) {
          const translatedError =
            CreateOrchidError[errorResponse as keyof typeof CreateOrchidError];
          dispatch(createOrchidFailed(translatedError));
        } else {
          dispatch(createOrchidFailed(errorResponse));
        }
      } else {
        dispatch(createOrchidFailed("Unknown error"));
      }
    }
  };
  return { state , handleCreateOrchid}
}
