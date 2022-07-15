import { combineReducers } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import searchReducer from "./slices/searchSlice";
import loginFormReducer from "./slices/loginFormSlice";
import registerFormReducer from "./slices/registerFormSlice";
import pokemonsReducer from "./slices/pokemonsSlice";

const rootReducer = combineReducers({
  modal: modalReducer,
  search: searchReducer,
  loginForm: loginFormReducer,
  registerForm: registerFormReducer,
  pokemons: pokemonsReducer,
});

export default rootReducer;
