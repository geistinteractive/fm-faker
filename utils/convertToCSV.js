import { parseAsync } from "json2csv";
export async function convertToCSV(json) {
  const fields = Object.keys(json[0]);
  const opts = { fields };
  return parseAsync(json, opts);
}
