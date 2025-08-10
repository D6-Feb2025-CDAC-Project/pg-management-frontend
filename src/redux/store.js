import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer, { logout } from "./slices/authSlice";
import { expiryMiddleware } from "./middlewares/expiryMiddleware";

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(expiryMiddleware),
});

export const persistor = persistStore(store, null, () => {
  // This callback runs after redux-persist rehydrates the store
  const state = store.getState();
  if (state.auth.isLoggedIn && state.auth.expiresAt) {
    if (Date.now() > state.auth.expiresAt) {
      store.dispatch(logout());
      localStorage.clear();
    }
  }
});
