import { combineReducers } from "redux";
import postsReducer from "./postsSlice";

export default combineReducers({
  posts: postsReducer,
});