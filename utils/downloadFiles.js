import fetch from "isomorphic-fetch";
import FileSaver from "file-saver";
import { convertToCSV } from "./convertToCSV";
export async function downloadFiles(dataSet) {
  const response = await fetch(`/api/generate/${dataSet}`);
  const result = await response.json();
  const fileNames = Object.keys(result);
  fileNames.forEach(async (name) => {
    const content = result[name];
    const csv = await convertToCSV(content);
    var blob = new Blob([csv], { type: "text/csv" });
    FileSaver.saveAs(blob, `${name}.csv`);
  });
}
