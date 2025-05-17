import { createSlice } from "@reduxjs/toolkit";

const greetings = ["hello", "there", "general", "kenobi"];

type GreetingState = {
  index: number;
  text: string;
};

const initialGreetingState: GreetingState = {
  index: 0,
  text: greetings[0],
};

const greetingSlice = createSlice({
  name: "greeting",
  initialState: initialGreetingState,
  reducers: {
    next(state) {
      state.index = (state.index + 1) % greetings.length;
      state.text = greetings[state.index];
      return state;
    },
  },
});

const greetingReducer = greetingSlice.reducer;
const greetingActions = greetingSlice.actions;

export { type GreetingState, greetingReducer, greetingActions };
