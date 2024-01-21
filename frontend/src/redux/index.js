import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user from "./user.js";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  user: user,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
