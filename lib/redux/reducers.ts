import { combineReducers } from "@reduxjs/toolkit";
import { modalReducer } from "./slices/modalSlice";
import { pokemonsReducer } from "./slices/pokemonsSlice";
import { userReducer } from "./slices/userSlice";
import { usersReducer } from "./slices/usersSlice";
import { filterBarReducer } from "./slices/filterBarSlice";
import { commentFormReducer } from "./slices/commentFormSlice";

const rootReducer = combineReducers({
  modal: modalReducer,
  pokemons: pokemonsReducer,
  user: userReducer,
  filterBar: filterBarReducer,
  commentForm: commentFormReducer,
  users: usersReducer,
});

export default rootReducer;
