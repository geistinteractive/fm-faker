import { readFileSync, readdirSync } from "fs";

export default function readDataSets() {
  const files = readdirSync("./schema/DataSets");
  console.log(files);
  const datasets = files.map(file => {
    const dataset = require(`../schema/DataSets/${file}`);

    return dataset.dataSet;
  });

  return datasets;
}
