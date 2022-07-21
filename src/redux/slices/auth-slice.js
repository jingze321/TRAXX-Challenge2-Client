import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  id: "",
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthDetails: (state, action) => {
      for (const property in action.payload) {
        if (!!action.payload[property])
          state[property] = action.payload[property];
      }
    },
    clearAuthDetails: () => {
      return initialState;
    },
  },
});

export const { setAuthDetails, clearAuthDetails } = authSlice.actions;

export default authSlice.reducer;
