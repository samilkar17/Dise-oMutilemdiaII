import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import userReducer from'../../Puertos/feactures/user/userSlice'
import activityReducer from "../../Puertos/feactures/activity/activitySlice";

const reducer = combineReducers({
  user: userReducer,
  activity: activityReducer,
});




export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
