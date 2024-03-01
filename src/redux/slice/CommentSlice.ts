import create from "@ant-design/icons/lib/components/IconFont";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface newComment {
  orchid_slug: string;
  user_id: string;
  comment: string;
}

export interface CommnentProps {
  Comment: newComment;
  isFetching: boolean;
  error: boolean;
  displayError: string;
}

const initialState: CommnentProps = {
  Comment: {} as newComment,
  isFetching: false,
  error: false,
  displayError: "",
};

const createCommentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    createComment: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createCommentSuccess: (state, action: PayloadAction<newComment>) => {
      state.isFetching = false;
      state.Comment = action.payload;
      state.error = false;
    },
    createCommentFailed: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = true;
      state.displayError = action.payload;
    },
  },
});

export const { 

    createComment,
    createCommentFailed,createCommentSuccess
 } =
  createCommentSlice.actions;

export default createCommentSlice.reducer;
