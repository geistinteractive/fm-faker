import FileSaver from "file-saver";
import { convertToCSV } from "./convertToCSV";
import generateData from "./generateData";

export function generateTableSchema(table) {
  const schema = _generateTableSchema(table);
  return schema;
}
export function downloadTableSchema(table) {
  const name = table.name + ".schema";
  const file = generateTableSchema(table);
  const fileJSON = JSON.stringify(file, null, "  ");
  const blob = new Blob([fileJSON], { type: "application/json" });
  FileSaver.saveAs(blob, `${name}.json`);
  return null;
}

export async function downloadCSV(table) {
  const name = table.name + ".data";
  const schema = generateTableSchema(table);

  const data = await generateData(schema);

  const csvData = await convertToCSV(data[table.name]);

  const blob = new Blob([csvData], { type: "text/csv" });
  FileSaver.saveAs(blob, `${name}.csv`);
  return null;
}

function _generateTableSchema(table, schemaObj = {}) {
  const { definitions = {}, properties = {}, requiredData = [] } = schemaObj;
  const fields = table.fields.data; //fauna nesting

  const props = {};
  const required = [];
  fields.forEach(fieldObj => {
    const field = fieldObj.data;
    const schema = field.schemaOverride ? field.schemaOverride : field.schema;
    props[field.name] = schema;
    required.push(field.name);
  });
  requiredData.push(table.name);
  definitions[table.name] = props;

  properties[table.name] = {
    type: "array",
    minItems: 12,
    maxItems: 20,
    items: {
      required,
      type: "object",
      properties: { $ref: `#/definitions/${table.name}` }
    }
  };
  return { definitions, properties, requiredData };
}
