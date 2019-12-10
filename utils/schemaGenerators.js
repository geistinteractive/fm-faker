import FileSaver from "file-saver";
import { convertToCSV } from "./convertToCSV";
import generateData from "./generateData";
import sortBy from "lodash.sortby";

export function generateTableSchema(table) {
  const schema = _generateTableSchema(table);
  return schema;
}

export function generateFullSchema(dataSet) {
  const schema = _generateFullSetSChema(dataSet);
  return schema;
}

export async function downloadDataSetJSON(dataSet) {
  const schema = _generateFullSetSChema(dataSet);
  const data = await generateData(schema);
  saveJSONFile(data, dataSet.fileName);
}

export function downloadDataSetSchema(dataSet) {
  const file = _generateFullSetSChema(dataSet);
  saveJSONFile(file, dataSet.fileName);
  return null;
}

export async function downloadFullSetCSVs(dataSet) {
  const schema = _generateFullSetSChema(dataSet);
  const data = await generateData(schema);

  const tableNames = Object.keys(data);
  tableNames.forEach(async name => {
    const d = data[name];
    const csvData = await convertToCSV(d);
    saveCSVFile(csvData, name);
  });
}

function _generateTableSchema(table, schemaObj = {}) {
  const { definitions = {}, properties = {}, required = [] } = schemaObj;
  const fields = table.fields.data; //fauna nesting

  if (fields.length === 0) return; // no fields so exit
  const props = {};
  const requiredFields = [];
  fields.forEach(fieldObj => {
    const field = fieldObj.data;
    let schema = field.schemaOverride ? field.schemaOverride : field.schema;
    if (schema["fm-related"]) {
      const obj = schema["fm-related"];
      schema = {
        jsonPath: {
          path: `$..${obj.table}.[*].${obj.field}`
        }
      };
    }
    props[field.name] = schema;
    requiredFields.push(field.name);
  });
  required.push(table.name);
  definitions[table.name] = props;

  properties[table.name] = {
    type: "array",
    minItems: Number(table.minimum || 20),
    maxItems: Number(table.maximum || 40),
    items: {
      required: requiredFields,
      type: "object",
      properties: { $ref: `#/definitions/${table.name}` }
    }
  };
  return { definitions, properties, required };
}

function _generateFullSetSChema(file) {
  const schemaObj = { definitions: {}, properties: {}, required: [] };
  let tables = file.tables.data;

  tables = sortBy(tables, t => {
    return t.data.name;
  });

  tables.forEach(t => {
    _generateTableSchema(t.data, schemaObj);
  });

  return schemaObj;
}

function saveJSONFile(data, name) {
  const fileJSON = JSON.stringify(data, null, "  ");
  const blob = new Blob([fileJSON], { type: "application/json" });
  FileSaver.saveAs(blob, `${name}.json`);
}

function saveCSVFile(data, name) {
  const blob = new Blob([data], { type: "text/csv" });
  FileSaver.saveAs(blob, `${name}.csv`);
}
