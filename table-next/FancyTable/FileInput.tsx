"use client";
import { ChangeEvent } from "react";

type Props = {
  handleContent: (fileName: string, content: string) => void;
};

export default function FileInput({ handleContent }: Props) {
  function onInputFileChange(event: ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;
    if (!fileList || fileList === null) console.log("no files chosen");
    const firstFile = fileList![0];
    loadFile(firstFile);
  }

  function loadFile(file: File) {
    console.log(file);
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as string;
      handleContent(file.name, content);
    };
    reader.readAsText(file);
  }

  return (
    <div className="w-full">
      <input
        type="file"
        className="block rounded border border-slate-600 p-2 cursor-pointer"
        onChange={onInputFileChange}
      />
    </div>
  );
}
