import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state ,action) => {
            return action.payload;
        },
        
        removeFeed: (state ,action) => {
            if (!state) return state;
            const newArray = state.filter(item => item._id !==action.payload)
            return newArray;
        },
        appendFeed: (state ,action) => {
            if (!state) return action.payload;
            return [...state, ...action.payload];
        },
        clearFeed: (state,action) => {
            return null;
        }
    }
});

export const {addFeed , removeFeed , appendFeed , clearFeed} = feedSlice.actions;

export default feedSlice.reducer;