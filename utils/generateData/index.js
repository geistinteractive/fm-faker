import jsf from "json-schema-faker";
import chance from "chance";
import fmDate from "./lib/fmDate";
import fmTime from "./lib/fmTime";
import fmTimeStamp from "./lib/fmTimeStamp";
import fmRelated from "./lib/fmRelated";
export default function generateData(schema) {
  jsf.define("fm-date", fmDate);
  jsf.define("fm-time", fmTime);
  jsf.define("fm-timestamp", fmTimeStamp);
  jsf.define("fm-related", fmRelated);
  jsf.extend("chance", chance);
  jsf.extend("faker", () => require("faker"));
  jsf.option({ resolveJsonPath: true });
  return jsf.resolve(schema);
}
