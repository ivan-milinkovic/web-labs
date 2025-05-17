import "./App.css";
import { counterActions } from "./redux-counter";
import { greetingActions } from "./redux-greeting";
import type { MouseEvent } from "react";
import { asyncIncrementThunk } from "./redux-thunk";
import { useAppDispatch, useAppSelector } from "./redux-hooks";

function App() {
  const counter = useAppSelector((state) => {
    return state.counter.counter;
  });
  const greeting = useAppSelector((state) => {
    return state.greeting.text;
  });
  const isLoading = useAppSelector((state) => {
    return state.asyncInc.isLoading;
  });

  const dispatch = useAppDispatch();

  function counterClick() {
    dispatch(counterActions.add({ amount: 1 }));
  }

  function counterRightClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dispatch(counterActions.add({ amount: -1 }));
  }

  function greetingClick() {
    dispatch(greetingActions.next());
  }

  function asyncIncrement() {
    dispatch(asyncIncrementThunk(2));
  }

  return (
    <>
      <button onClick={counterClick} onContextMenu={counterRightClick}>
        count is {counter}
      </button>

      <br />
      <br />

      <button onClick={greetingClick}>{greeting}</button>

      <br />
      <br />

      <button onClick={asyncIncrement} disabled={isLoading}>
        Async increment
        {isLoading && "..."}
      </button>
    </>
  );
}

export default App;
