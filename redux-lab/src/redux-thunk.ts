import type { AppDispatch, AppState } from "./redux";
import { counterActions } from "./redux-counter";
import { loadingActions } from "./redux-loader";

export const asyncIncrementThunk = (amount: number) => {
  return async (dispatch: AppDispatch, getState: () => AppState) => {
    if (getState().asyncInc.isLoading) return;

    dispatch(loadingActions.setLoading(true));

    setTimeout(() => {
      dispatch(counterActions.add({ amount: amount }));

      dispatch(loadingActions.setLoading(false));
    }, 500);
  };
};
