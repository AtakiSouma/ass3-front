import { ErrorResponse, NavigateFunction } from "react-router-dom";
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
import { message } from "antd";
interface UserData {
  user: {
    id: string;
    username: string;
    isAdmin: boolean;
    email: string;
    avatar: string;
  };
}
interface commentData {
  _id: string;
  author_img: string;
  author_name: string;
  rating: string;
  comment: string;
  author: string;
}
export function useCreateComment() {
  const userDataObject: UserData = JSON.parse(localStorage.getItem("user")!);
   const state = useAppSelector((state) => state.orchid)
  const dispatch  = useAppDispatch();
  const handleCreateComment = async (input: CommentToOrchidParam) => {
    dispatch(addCommentStart())
    try {
      const newComment = await agent.Orchid.createNewComment(input);
      dispatch(addCommentSuccess(newComment));
      message.success("Add new Comment SucCessfully")
    } catch (error) {
      dispatch(addCommentFailed());
      const typedError = error as ErrorResponse;
      const errorMessage = typedError?.data?.error?.message || "Unknown error";
      message.error(errorMessage)
    }
  };

  const userHasCommented = (orchidComments: commentData[]) => {
    // Check if the user has already commented on the orchid
    return orchidComments.some((comment) => comment.author === userDataObject.user.id);
  };

  return  { state , handleCreateComment , userHasCommented} ; 
}

