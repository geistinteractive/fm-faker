import jsf from "json-schema-faker";
import chance from "chance";
jsf.extend("chance", chance);
jsf.extend("faker", () => require("faker"));
import { readFileSync } from "fs";

const cwd = "./schema/Tables";
jsf.option({ resolveJsonPath: true });

const schema = {
  type: "object",
  properties: {
    InventoryItem: {
      type: "array",
      minItems: 10,
      maxItems: 14,
      items: {
        type: "object",
        properties: { $ref: "InventoryItems.json" },
        required: ["Id", "Description", "Price", "Image"]
      }
    },
    Invoice: {
      type: "array",
      minItems: 1,
      maxItems: 4,
      items: {
        type: "object",
        properties: {
          Id: {
            type: "string",
            unique: true,
            chance: "guid"
          },
          Dates: {
            type: "string",
            chance: { date: { year: 2019, string: true } }
          },
          CustomerId: {
            jsonPath: { path: "$..Customer.[*].Id", count: 10 }
          }
        },
        required: ["Id", "Dates", "CustomerId"]
      }
    },
    InvoiceItem: {
      type: "array",
      minItems: 10,
      maxItems: 40,
      items: {
        type: "object",
        properties: { $ref: "InventoryItems.json" },
        required: ["Id", "Qty", "InvoiceId", "InventoryItemId"]
      }
    },
    Customer: {
      type: "array",
      minItems: 1,
      maxItems: 4,
      items: {
        type: "object",
        properties: {
          Id: {
            type: "string",
            unique: true,
            chance: "guid"
          },
          Name: {
            type: "string",
            faker: "company.companyName",
            unique: true
          }
        },
        required: ["Id", "Name"]
      }
    }
  },
  required: ["Invoice", "Customer", "InvoiceItem", "InventoryItem"]
};

export default DataSet => {
  const schema = readFileSync(`./schema/DataSets/${DataSet}.json`).toString();

  return jsf.resolve(JSON.parse(schema), cwd);
};
