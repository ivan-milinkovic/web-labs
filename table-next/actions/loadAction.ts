"use server";
import { CsvModel } from "@/FancyTable/CsvModel";
import fs from "node:fs";
import Papa from "papaparse";

export async function loadDefaultFileAction(): Promise<[string, CsvModel]> {
  const fileName = "pixar_films.csv";
  const filePath = process.cwd() + "/csv/Pixar+Films/" + fileName;
  const content = fs.readFileSync(filePath, "utf8");
  const csvModel = await loadCsvContentAction(content);
  return [fileName, csvModel];
}

export async function loadCsvContentAction(content: string): Promise<CsvModel> {
  const parsed = Papa.parse<string[]>(content, { skipEmptyLines: true });

  const csvModel: CsvModel = {
    headers: parsed.data[0],
    rows: parsed.data.slice(1),
  };

  return csvModel;
}
