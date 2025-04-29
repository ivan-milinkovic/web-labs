"use client";

import { useState } from "react";

const Ping = () => {
  const [response, setResponse] = useState("");
  async function get() {
    const res = await fetch("/api/ping");
    const data = await res.text();
    setResponse(data);
  }

  async function send(fd: FormData) {
    const input1 = fd.get("input1");
    const res = await fetch("/api/ping", {
      method: "POST",
      body: JSON.stringify(input1),
    });
    const data = await res.text();
    setResponse(data);
  }

  return (
    <div>
      <button onClick={get}>Get</button>
      <form action={send}>
        <label htmlFor="input1"></label>
        <input type="text" name="input1" placeholder="input" />
        <button>Submit</button>
        <div>Response: {response}</div>
      </form>
    </div>
  );
};

export default Ping;
