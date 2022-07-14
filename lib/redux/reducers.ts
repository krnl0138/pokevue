import { combineReducers } from "@reduxjs/toolkit";
import recentSearchReducer from "./slices/recentSearchSlice";
import modalReducer from "./slices/modalSlice";
import searchReducer from "./slices/searchSlice";

const rootReducer = combineReducers({
  recentSearch: recentSearchReducer,
  modal: modalReducer,
  search: searchReducer,
});

export default rootReducer;
