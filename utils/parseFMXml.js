import generateData from "./generateData";
import sortBy from "lodash.sortby";

function getType(datatype) {
  switch (datatype) {
    case "Text":
      return { type: "string" };
    case "Number":
      return { type: "integer" };
    case "Date":
      return { type: "string" };
    case "Timestamp":
      return { type: "string" };
    case "Binary":
      return { type: "string" };
    default:
      return "unknown";
  }
}

/**
 * parse Base Tables and Fields
 * @param {Document} xmlDoc
 */
function parseTablesFromXml(xmlDoc) {
  let TablesArray = [];
  const TablesNodes = xmlDoc.getElementsByTagName("BaseTable");
  const FieldCatalog = xmlDoc.getElementsByTagName("FieldCatalog");
  for (var i = 0; i < TablesNodes.length; i++) {
    const FieldsForTable = FieldCatalog[i].getElementsByTagName("Field");
    let fields = [];
    for (var n = 0; n < FieldsForTable.length; n++) {
      const fieldNode = FieldsForTable[n];

      const StorageNode = fieldNode.getElementsByTagName("Storage")[0];
      const IsGlobal = StorageNode
        ? StorageNode.getAttribute("global") === "True"
        : false;
      if (!IsGlobal) {
        const obj = attr(fieldNode);

        if (obj.fieldtype === "Normal") {
          const AutoEnterNode = fieldNode.getElementsByTagName("AutoEnter")[0];
          const ValidationNode = fieldNode.getElementsByTagName(
            "Validation"
          )[0];
          obj.exampleData = getType(obj.datatype);
          obj.autoEnter = attr(AutoEnterNode);
          obj.validation = attr(ValidationNode);
          fields.push(obj);
        }
      }
    }

    const fieldsSorted = sortBy(fields);
    const UUIDNode = TablesNodes[i].getElementsByTagName("UUID")[0];
    const Table = attr(TablesNodes[i]);
    Table.uuid = UUIDNode.textContent;
    Table.mods = attr(UUIDNode);
    Table.fields = fieldsSorted;
    TablesArray[i] = Table;
  }

  const sorted = sortBy(TablesArray, t => t.name);

  return sorted;
}

function attr(node) {
  const obj = {};
  node.getAttributeNames().map(attr => {
    obj[attr] = node.getAttribute(attr);
  });
  return obj;
}
/**
 * parse the first file tables
 * @param {file} acceptedFiles
 */
export function parseTables(acceptedFiles) {
  const name = acceptedFiles[0].name;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onabort = () => {
      reject("aborted");
    };
    reader.onerror = err => {
      reject(err);
    };
    reader.onload = () => {
      // Do whatever you want with the file contents
      const xml = reader.result;
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(xml, "application/xml");
      const tables = parseTablesFromXml(xmlDoc);

      resolve({ name: `from ${name}`, tables, fileName: name });
    };
    //read the file
    reader.readAsText(acceptedFiles[0]);
  });
}

export function makeSchemas(data) {
  const definitions = {};
  const properties = {};
  const requiredData = [];
  data.forEach(table => {
    const props = {};
    const required = [];
    table.fields.forEach(field => {
      props[field.name] = { type: "string" };
      required.push(field.name);
    });
    props["XXX"] = {
      jsonPath: { path: "$..Global.[*].yyy", count: 10 }
    };
    props["yyy"] = { type: "string", unique: true, chance: "guid" };
    required.push("XXX");
    required.push("yyy");
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
  });

  return generateData({ properties, definitions, required: requiredData });
}
