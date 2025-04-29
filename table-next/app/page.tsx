"use client";
import FileInput from "@/FancyTable/FileInput";
import FancyTable from "@/FancyTable/FancyTable";
import { useEffect, useState } from "react";
import {
  loadCsvContentAction,
  loadDefaultFileAction,
} from "../actions/loadAction";
import { CsvModel } from "@/FancyTable/CsvModel";

export default function Home() {
  const [csvModel, setCsvModel] = useState<CsvModel | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  async function handleContent(aFileName: string, content: string) {
    setIsLoading(true);
    // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const data = await loadCsvContentAction(content);
    setCsvModel(data);
    setFileName(aFileName);
    setIsLoading(false);
  }

  async function loadContent() {
    setIsLoading(true);
    // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    const [file, data] = await loadDefaultFileAction();
    setFileName(file);
    setCsvModel(data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadContent();
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <FileInput handleContent={handleContent} />
      <div className="my-4">
        {csvModel && (
          <div className="">
            <span>{fileName}</span>
            <FancyTable key={fileName} data={csvModel} />
          </div>
        )}
      </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row"></div>
      </main>
    </div>
  );
}
