import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestsReducer from "./requetsSlice";
import orderReducer from "./orderSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    requests: requestsReducer,
    order: orderReducer,
  },
});

export default appStore;
