import { createSlice } from "@reduxjs/toolkit";

type CounterState = {
  counter: number;
};

type CounterAction = {
  type: string;
  payload: { amount: number };
};

const initialCounterState: CounterState = { counter: 0 };

const counterSlice = createSlice({
  name: "counterSlice",
  initialState: initialCounterState,
  reducers: {
    add(state, action: CounterAction) {
      state.counter += action.payload.amount; // Editing of state allowed because it is a wrapped copy (using Immer library)
      return state;
    },
  },
});

const counterReducer = counterSlice.reducer;
const counterActions = counterSlice.actions;

export { type CounterState, counterReducer, counterActions };
