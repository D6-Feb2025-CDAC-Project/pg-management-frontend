import { logout } from "../slices/authSlice";

export const expiryMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (state.auth.isLoggedIn && state.auth.expiresAt) {
    if (Date.now() > state.auth.expiresAt) {
      store.dispatch(logout());
      localStorage.clear(); // clear persisted data
      return; // stop further processing
    }
  }

  return next(action);
};
