import { combineReducers } from "@reduxjs/toolkit";
import { modalReducer } from "./slices/modalSlice";
import { searchReducer } from "./slices/searchSlice";
import { loginFormReducer } from "./slices/loginFormSlice";
import { registerFormReducer } from "./slices/registerFormSlice";
import { profileFormReducer } from "./slices/profileFormSlice";
import { pokemonsReducer } from "./slices/pokemonsSlice";
import { userReducer } from "./slices/userSlice";
import { filterBarReducer } from "./slices/filterBarSlice";

const rootReducer = combineReducers({
  modal: modalReducer,
  search: searchReducer,
  loginForm: loginFormReducer,
  registerForm: registerFormReducer,
  profileForm: profileFormReducer,
  pokemons: pokemonsReducer,
  user: userReducer,
  filterBar: filterBarReducer,
});

export default rootReducer;
