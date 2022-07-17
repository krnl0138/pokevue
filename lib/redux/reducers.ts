import { combineReducers } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import searchReducer from "./slices/searchSlice";
import searchAllReducer from "./slices/searchAllSlice";
import loginFormReducer from "./slices/loginFormSlice";
import registerFormReducer from "./slices/registerFormSlice";
import profileFormReducer from "./slices/profileFormSlice";
import pokemonsReducer from "./slices/pokemonsSlice";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  modal: modalReducer,
  search: searchReducer,
  searchAll: searchAllReducer,
  loginForm: loginFormReducer,
  registerForm: registerFormReducer,
  profileForm: profileFormReducer,
  pokemons: pokemonsReducer,
  user: userReducer,
});

export default rootReducer;
