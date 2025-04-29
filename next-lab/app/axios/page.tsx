"use client";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export default function Axios() {
  const [output, setOutput] = useState("");
  const buttonStyle = "border rounded border-blue-500 px-4";

  async function onClick1() {
    try {
      const res = await axios.get("api/ping", { params: { sort: "asc" } });
      setOutput(res.data as string);
    } catch (err: unknown) {
      setOutput((err as AxiosError).message);
    }
  }

  async function onClick2() {
    try {
      const getReq = axios.get("api/ping", { params: { sort: "asc" } });
      const getReq2 = axios({ method: "get", url: "api/ping" });
      const res = await Promise.all([getReq, getReq2]);
      setOutput(((res[0].data as string) + ", " + res[1].data) as string);
    } catch (err: unknown) {
      setOutput((err as AxiosError).message);
    }
  }

  async function onClick3() {
    try {
      const getReq = axios.get("api/ping", { params: { sort: "asc" } });
      const getReq2 = axios.post("api/ping", { hello: "there" });
      const res = await Promise.all([getReq, getReq2]);
      setOutput(
        ((res[0].data as string) + ", " + JSON.stringify(res[1].data)) as string
      );
    } catch (err: unknown) {
      setOutput((err as AxiosError).message);
    }
  }

  async function postJsonForm() {
    try {
      const res = await axios.post(
        "api/form",
        document.querySelector("#form1"),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setOutput(JSON.stringify(res.data as string));
    } catch (err) {
      setOutput((err as AxiosError).message);
    }
  }

  async function postMultipartForm() {
    try {
      const res = await axios.post(
        "api/form",
        document.querySelector("#form1"),
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setOutput(JSON.stringify(res.data as string));
    } catch (err) {
      setOutput((err as AxiosError).message);
    }
  }

  async function postUrlEncodedForm() {
    try {
      const res = await axios.post(
        "api/form",
        document.querySelector("#form1"),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      setOutput(JSON.stringify(res.data as string));
    } catch (err) {
      setOutput((err as AxiosError).message);
    }
  }

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <div>
        <button onClick={onClick1} className={buttonStyle}>
          1 request
        </button>
        <button onClick={onClick2} className={buttonStyle}>
          2 requests
        </button>
        <button onClick={onClick3} className={buttonStyle}>
          Get + Post
        </button>
      </div>
      <div>
        <button onClick={postJsonForm} className={buttonStyle}>
          Post Json Form
        </button>
        <button onClick={postMultipartForm} className={buttonStyle}>
          Post Multipart Form
        </button>
        <button onClick={postUrlEncodedForm} className={buttonStyle}>
          Post Form Encoded
        </button>
        <form action="" id="form1" className="inline">
          <input type="text" name="someData" className="border" />
          <input type="file" name="someFile" />
        </form>
      </div>
      <br />
      <div className="">{output}</div>
    </div>
  );
}
