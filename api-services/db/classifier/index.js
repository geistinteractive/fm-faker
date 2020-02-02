import classifier from "./fieldClassifier";

export default function fileClassifer(File) {
  const result = File.tables.map(tableClassifier);

  return Promise.all(result);
}

export async function tableClassifier(table) {
  const r2 = await table.fields.map(async field => {
    await classifier(field);
  });
  return Promise.all(r2);
}
