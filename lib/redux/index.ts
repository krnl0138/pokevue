import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import logger from "redux-logger";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
