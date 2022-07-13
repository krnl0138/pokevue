import { combineReducers } from "@reduxjs/toolkit";
import recentSearchReducer from "./slices/recentSearchSlice";

const rootReducer = combineReducers({
  recentSearch: recentSearchReducer,
});

export default rootReducer;
