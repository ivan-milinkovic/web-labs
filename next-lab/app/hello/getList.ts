"use server";
export default async function getList(): Promise<string[]> {
  const listPromise = new Promise<string[]>((resolve) => {
    setTimeout(() => {
      const l = ["one", "two", "three", "four"];
      resolve(l);
    }, 1000);
  });
  return listPromise;
}
