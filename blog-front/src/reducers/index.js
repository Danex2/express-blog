import { combineReducers } from "redux";
import authReducer from "../reducers/auth";
import errorReducer from "../reducers/error-reducer";
import postsReducer from "../reducers/postsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  posts: postsReducer
});
