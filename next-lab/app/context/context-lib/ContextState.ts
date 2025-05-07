export type ContextState = {
  get: () => number;
  set: (newValue: number) => void;
};
