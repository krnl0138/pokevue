import { combineReducers } from "@reduxjs/toolkit";
import { modalReducer } from "./slices/modalSlice";
import { pokemonsReducer } from "./slices/pokemonsSlice";
import { userReducer } from "./slices/userSlice";
import { filterBarReducer } from "./slices/filterBarSlice";

const rootReducer = combineReducers({
  modal: modalReducer,
  pokemons: pokemonsReducer,
  user: userReducer,
  filterBar: filterBarReducer,
});

export default rootReducer;
