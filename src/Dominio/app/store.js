import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import userReducer from "../../Puertos/feactures/user/userSlice";
import activityReducer from "../../Puertos/feactures/activity/activitySlice";
import genderReducer from "../../Puertos/feactures/gender/genderSlices";
const reducer = combineReducers({
  user: userReducer,
  activity: activityReducer,
  gender: genderReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
