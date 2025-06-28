import { createSlice } from "@reduxjs/toolkit";

// Charger le user depuis localStorage si dispo
const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState == null) return { user: null };
    return { user: JSON.parse(serializedState) };
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return { user: null };
  }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    updateUser: (state, action) => {
      // mettre à jour certaines propriétés seulement (comme username ou email)
      state.user = {
        ...state.user,
        ...action.payload,
      };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

export const { setUser, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
