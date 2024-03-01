import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/loginSlice"
import registerReducer from "./slice/registerSlice"
import categoryReducer from "./slice/categorySlice"
import orchidReducer from "./slice/orchidSlice"
import orchidNoPagingReducer from "./slice/orchidNoPagingSlice"
import orchidCreate from "./slice/createOrchid";
import commentReducer from "./slice/CommentSlice"
import userSlice from "./slice/userSlice";
import customerSlice from "./slice/UserManagement'Slice."
export const store = configureStore({
    reducer:{
        auth:authReducer,
        register:registerReducer,
        category : categoryReducer,
        orchid: orchidReducer,
        orchidNoPaging: orchidNoPagingReducer,
        createOrchid:orchidCreate,
        comment: commentReducer,
        user: userSlice,
        customer: customerSlice,
      }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type PayloadAction<T, Type extends string, Payload = T> = {
  payload?: Payload;
  type: Type;
};
