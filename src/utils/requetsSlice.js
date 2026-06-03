import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: (state, action) => {
      if (!state) return state;
      const newArray = state.filter((item) => item._id !== action.payload);
      return newArray;
    },
    clearRequests: (state, action) => {
      return null;
    },
  },
});

export const { addRequests, removeRequests, clearRequests } =
  requestsSlice.actions;

export default requestsSlice.reducer;
