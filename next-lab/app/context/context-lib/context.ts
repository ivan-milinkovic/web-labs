"use client";
import { createContext } from "react";
import { ContextState } from "./ContextState";

export const MyContext = createContext<ContextState>({
  get: () => 0,
  set: (newValue: number) => {},
});
