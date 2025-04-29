"use client";

import { use } from "react";

export function List({ getList }: { getList: Promise<string[]> }) {
  const list = use(getList);
  return (
    <ul>
      {list.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}
