import { useContext } from "react";
import { MyContext } from "./context";

export default function useMyContext() {
  return useContext(MyContext);
}
