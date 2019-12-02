import { format, addDays, subDays } from "date-fns";
import { randomIntFromInterval } from "./utils";

export default function fmDate(value, schema) {
  let dateFormat = value.format ? value.format : "MM/dd/yyyy";
  let date;

  if (value.relativeDays) {
    date = relativeDays(value.relativeDays);
  } else {
    // default for now
    date = relativeDays({});
  }

  return format(date, dateFormat);
}

function relativeDays({ from = -500000, to = 50000 }) {
  let d = new Date();

  if (from > to) {
    from = -50000;
    to = 50000;
  }

  const r = randomIntFromInterval(from, to);

  if (d < 0) {
    d = subDays(d, r);
  } else {
    d = addDays(d, r);
  }
  return d;
}
