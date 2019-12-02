import jsf from "json-schema-faker";
import chance from "chance";
import { format, addDays, subDays } from "date-fns";
import fk from "faker";

export default function generateData(schema) {
  jsf.define("fm-date", fmDate);
  jsf.extend("chance", chance);
  jsf.extend("faker", () => require("faker"));
  jsf.option({ resolveJsonPath: true });
  return jsf.resolve(schema);
}

function fmDate(value, schema) {
  let d = new Date();

  let dateFormat = "MM/dd/yyyy";
  let from = -10000;
  let to = 10000;
  if (value.from !== undefined) {
    from = value.from;
  }
  if (value.to !== undefined) {
    to = value.to;
  }

  if (from > to) {
    from = -10000;
    to = 10000;
  }
  if (value.format) dateFormat = value.format;

  const r = randomIntFromInterval(from, to);
  if (d < 0) {
    d = subDays(d, r);
  } else {
    d = addDays(d, r);
  }

  return format(d, dateFormat);
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
