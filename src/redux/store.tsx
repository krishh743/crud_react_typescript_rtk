import {configureStore} from "@reduxjs/toolkit";
import Reducer from "./Reducer";

export const store = configureStore({
  reducer: Reducer,
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
