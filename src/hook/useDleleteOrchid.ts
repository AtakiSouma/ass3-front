import { message, notification } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import agent from "../utils/agents";

import { ErrorResponse, NavigateFunction } from "react-router-dom";
import {
  deleteOrchidFail,
  deleteOrchidStart,
  deleteOrchidSuccess,
} from "../redux/slice/orchidSlice";

export function useDeleteOrchid() {
  const state = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // get user Details
  const DeleteOrchids = async (slug: string) => {
    dispatch(deleteOrchidStart());
    try {
      await agent.Orchid.deleteOrchid(slug);
      dispatch(deleteOrchidSuccess());
      message.success("Delete Orchid sucesffully");
    } catch (error) {
      const typedError = error as ErrorResponse;
      const errorMessage = typedError?.data?.error?.message || "Unknown error";
      console.error("Error fetching Trainee details:", error);
      dispatch(deleteOrchidFail(errorMessage));
    }
  };

  return { state, DeleteOrchids };
}
