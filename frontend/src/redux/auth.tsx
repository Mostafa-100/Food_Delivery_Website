import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  showForm: boolean;
  showLogin: boolean;
  showSignup: boolean;
  isLoggedIn: boolean;
}

export const auth = createSlice({
  name: "auth",
  initialState: {
    showForm: false,
    showLogin: true,
    showSignup: false,
    isLoggedIn: false,
  } as AuthState,
  reducers: {
    setShowForm: (state) => {
      state.showForm = !state.showForm;
    },
    setShowLogin: (state) => {
      state.showSignup = false;
      state.showLogin = !state.showLogin;
    },
    setShowSignup: (state) => {
      state.showLogin = false;
      state.showSignup = !state.showSignup;
    },
    setIsLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const { setShowForm, setShowLogin, setShowSignup, setIsLoggedIn } =
  auth.actions;
export default auth.reducer;
