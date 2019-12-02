import jsf from "json-schema-faker";
import chance from "chance";
import { format, addDays, subDays } from "date-fns";
import fmDate from "./lib/fmDate";

export default function generateData(schema) {
  jsf.define("fm-date", fmDate);
  jsf.extend("chance", chance);
  jsf.extend("faker", () => require("faker"));
  jsf.option({ resolveJsonPath: true });
  return jsf.resolve(schema);
}

