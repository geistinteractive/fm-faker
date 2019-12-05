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

export async function downloadCSV(table) {
  const name = table.name + ".data";
  const schema = generateTableSchema(table);

  const data = await generateData(schema);

  const csvData = await convertToCSV(data[table.name]);

  const blob = new Blob([csvData], { type: "text/csv" });
  FileSaver.saveAs(blob, `${name}.csv`);
  return null;
}

export function downloadTableSchema(table) {
  const name = table.name + ".schema";
  const file = generateTableSchema(table);
  saveJSONFile(file, name);
  return null;
}

function _generateTableSchema(table, schemaObj = {}) {
  const { definitions = {}, properties = {}, required = [] } = schemaObj;
  const fields = table.fields.data; //fauna nesting

  const props = {};
  const requiredFields = [];
  fields.forEach(fieldObj => {
    const field = fieldObj.data;
    const schema = field.schemaOverride ? field.schemaOverride : field.schema;
    props[field.name] = schema;
    requiredFields.push(field.name);
  });
  required.push(table.name);
  definitions[table.name] = props;

  properties[table.name] = {
    type: "array",
    minItems: 50,
    maxItems: 100,
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
