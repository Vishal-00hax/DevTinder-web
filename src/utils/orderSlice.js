import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      return action.payload;
    },
    clearOrders: (state, action) => {
      return [];
    },
  },
});

export const { addOrder, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
