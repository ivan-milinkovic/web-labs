"use client";
import { memo, useState } from "react";
import { MyContext } from "./context-lib/context";
import { ContextState } from "./context-lib/ContextState";
import {
  InnerComponent1,
  InnerComponent2,
  InnerComponent3,
  InnerUpdater,
} from "./InnerComponents";

const InnerComponent1Memo = memo(InnerComponent1);
const InnerComponent2Memo = memo(InnerComponent2);

export default function ContextPage() {
  console.log("ContextPage");
  const [val, setVal] = useState(0);
  const contextState: ContextState = {
    get: () => val,
    set: (newValue: number) => {
      setVal(newValue);
    },
  };

  return (
    <MyContext.Provider value={contextState}>
      <InnerComponent1Memo />
      <br />
      <InnerComponent2Memo />
      <br />
      <InnerComponent3 />
      <br />
      <InnerUpdater />
    </MyContext.Provider>
  );
}
