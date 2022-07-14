import { combineReducers } from "@reduxjs/toolkit";
import recentSearchReducer from "./slices/recentSearchSlice";
import modalReducer from "./slices/modalSlice";
import searchReducer from "./slices/searchSlice";
import loginFormReducer from "./slices/loginFormSlice";
import registerFormReducer from "./slices/registerFormSlice";

const rootReducer = combineReducers({
  recentSearch: recentSearchReducer,
  modal: modalReducer,
  search: searchReducer,
  loginForm: loginFormReducer,
  registerForm: registerFormReducer,
});

export default rootReducer;
