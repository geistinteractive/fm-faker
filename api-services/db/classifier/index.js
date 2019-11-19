import classifier from "./fieldClassifier";

export default function fileClassifer(File) {
  const result = File.tables.map(async table => {
    const r2 = await table.fields.map(async field => {
      await classifier(field);
    });
    return Promise.all(r2);
  });

  return Promise.all(result);
}
