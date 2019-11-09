import generateData from "./generateData";

function getType(datatype) {
  switch (datatype) {
    case "Text":
      return "string";
    case "Number":
      return "integer";
    case "Date":
      return "string";
    case "Time":
      return "string";
    case "Timestamp":
      return "string";
    case "Binary":
      return "string";
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
          obj.type = getType(obj.datatype);
          fields.push(obj);
        }
      }
    }

    const UUIDNode = TablesNodes[i].getElementsByTagName("UUID")[0];
    const Table = attr(TablesNodes[i]);
    Table.uuid = UUIDNode.textContent;
    Table.mods = attr(UUIDNode);
    Table.fields = fields;
    TablesArray[i] = Table;
  }
  //console.log(TablesArray);
  return TablesArray;
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
      const Tables = parseTablesFromXml(xmlDoc);
      resolve(Tables);
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
