"use client";

// fill: ★ or &#x2605;
// outline: ☆ or &#x2606;

import { useMemo, useState } from "react";

type Props = {
  count: number;
};

export default function RatingWidget({ count }: Props) {
  const [rating, setRating] = useState(0);
  const [overLevel, setOverLevel] = useState<number>(-1);

  const values = useMemo(
    () => new Array(count).fill(0).map((_value, index) => index + 1),
    [count]
  );

  function onRate(value: number) {
    setRating(value);
  }

  function additionalStyle(level: number) {
    return level <= (overLevel ?? 0) ? "text-blue-300" : "text-blue-400";
  }

  return (
    <span>
      {values.map((level) => (
        <span
          key={level}
          onClick={() => {
            onRate(level);
          }}
          onMouseOver={() => {
            setOverLevel(level);
          }}
          onMouseOut={() => {
            setOverLevel(-1);
          }}
          className={"text-4xl cursor-pointer " + additionalStyle(level)}
        >
          {level <= rating ? <>★</> : <>☆</>}
        </span>
      ))}
    </span>
  );
}
