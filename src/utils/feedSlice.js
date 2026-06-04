import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },

    removeFeed: (state, action) => {
      if (!state) return state;
      const newArray = state.filter((item) => item._id !== action.payload);
      return newArray;
    },
    appendFeed: (state, action) => {
      if (!state) return action.payload;
      const existingIds = new Set(state.map((item) => item._id));
      const uniqueUsers = action.payload.filter(
        (item) => !existingIds.has(item._id),
      );
      return [...state, ...uniqueUsers];
    },
    clearFeed: (state, action) => {
      return null;
    },
  },
});

export const { addFeed, removeFeed, appendFeed, clearFeed } = feedSlice.actions;

export default feedSlice.reducer;
