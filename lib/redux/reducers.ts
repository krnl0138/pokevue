import { combineReducers } from "@reduxjs/toolkit";
import recentSearchReducer from "./slices/recentSearchSlice";
import modalReducer from "./slices/modalSlice";

const rootReducer = combineReducers({
  recentSearch: recentSearchReducer,
  modal: modalReducer,
});

export default rootReducer;
