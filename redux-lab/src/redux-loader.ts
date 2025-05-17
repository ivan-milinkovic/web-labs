import { createSlice } from "@reduxjs/toolkit";

type LoadingState = {
  isLoading: boolean;
};

const initialLoadingState: LoadingState = {
  isLoading: false,
};

type AsyncIncAction = {
  type: string;
  payload: boolean;
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialLoadingState,
  reducers: {
    setLoading(state, action: AsyncIncAction) {
      state.isLoading = action.payload;
      return state;
    },
  },
});

const loadingReducer = loadingSlice.reducer;
const loadingActions = loadingSlice.actions;
export { loadingReducer, loadingActions };
