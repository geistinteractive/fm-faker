import jsf from "json-schema-faker";
import chance from "chance";
export default function generateData(schema) {
  jsf.extend("chance", chance);
  jsf.extend("faker", () => require("faker"));
  jsf.option({ resolveJsonPath: true });
  return jsf.resolve(schema);
}
