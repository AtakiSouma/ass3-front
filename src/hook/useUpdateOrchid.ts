import { ErrorResponse, NavigateFunction } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import agent, { UpdateORchidParams } from "../utils/agents";

import { updateOrchidFail, updateOrchidStart, updateOrchidSuccess } from "../redux/slice/orchidSlice";
import { message } from "antd";

export function useUpdateOrchid() {
  const state = useAppSelector((state) => state.orchid);
  const dispatch = useAppDispatch();

  const handleUpdateORchid = async (
    input: UpdateORchidParams,
    navigate: NavigateFunction
  ) => {
    dispatch(updateOrchidStart());
    try {
       await agent.Orchid.updateOrchid(input)
      dispatch(updateOrchidSuccess());
      navigate("/orchid");
    } catch (error) {
        console.log("error", error);
        const typedError = error as ErrorResponse;
        const errorMessage = typedError?.data?.error?.message || "Unknown error";
        dispatch(updateOrchidFail(errorMessage));
        message.error(errorMessage)
      }
  };
  return { state , handleUpdateORchid}
}
