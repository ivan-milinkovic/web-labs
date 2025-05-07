import useMyContext from "./context-lib/useMyContext";

export function InnerComponent1() {
  console.log("InnerComponent1");
  return <>InnerComponent1</>;
}

export function InnerComponent2() {
  console.log("InnerComponent2");
  const contextState = useMyContext();
  return <>InnerComponent2 {contextState.get()}</>;
}

export function InnerComponent3() {
  console.log("InnerComponent3");
  const contextState = useMyContext();
  return <>InnerComponent2 {contextState.get()}</>;
}

export function InnerUpdater() {
  console.log("InnerUpdater");
  const contextState = useMyContext();
  return (
    <button
      className="border cursor-pointer"
      onClick={() => {
        contextState.set(contextState.get() + 1);
      }}
    >
      Update Context
    </button>
  );
}
