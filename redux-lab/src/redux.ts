import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./redux-counter";
import { greetingReducer } from "./redux-greeting";
import { loadingReducer } from "./redux-loader";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    greeting: greetingReducer,
    asyncInc: loadingReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
