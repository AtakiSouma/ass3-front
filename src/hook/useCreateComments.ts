import { NavigateFunction } from "react-router-dom";
import { ICreateOrchidParams } from "../constants/data";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  createComment,
  createCommentFailed,
  createCommentSuccess,
} from "../redux/slice/CommentSlice";
import agent, { CommentParam, CommentToOrchidParam } from "../utils/agents";
import { AxiosError } from "axios";
import { CreateOrchidError } from "../constants/createOrchid";
import {
  addCommentFailed,
  addCommentStart,
  addCommentSuccess,
} from "../redux/slice/orchidSlice";

export function useCreateComment() {
   const state = useAppSelector((state) => state.orchid)
  const dispatch  = useAppDispatch();
  const handleCreateComment = async (input: CommentToOrchidParam) => {
    dispatch(addCommentStart())
    try {
      const newComment = await agent.Orchid.createNewComment(input);
      dispatch(addCommentSuccess(newComment));
    } catch (error) {
      dispatch(addCommentFailed());
    }
  };
  return  { state , handleCreateComment } ; 
}

