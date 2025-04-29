"use server";

import Image from "next/image";
import { Audiowide } from "next/font/google";
import { Suspense } from "react";
import { List } from "./List";
import getList from "./getList";

const font = Audiowide({ weight: "400" });

export default async function Hello() {
  return (
    <div style={{ margin: "10% 30%", width: "50%" }}>
      <Image src="/globe.svg" alt="image here" width={48} height={48} />
      Hello Page
      <p className={font.className}>Special Font</p>
      <br />
      <Suspense fallback={<div>Loading...</div>}>
        <List getList={getList()} />
      </Suspense>
    </div>
  );
}
