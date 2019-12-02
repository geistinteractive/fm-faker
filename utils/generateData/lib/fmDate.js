import {
  format,
  addDays,
  subDays,
  differenceInDays,
  parse,
  differenceInCalendarDays
} from "date-fns";
import { randomIntFromInterval } from "./utils";

export default function fmDate(value, schema) {
  let dateFormat = value.format ? value.format : "MM/dd/yyyy";
  let date;

  if (value.relativeDays) {
    date = relativeDays(value.relativeDays);
  } else if (value.range) {
    date = dateRange(value.range.from, value.range.to, dateFormat);
  } else {
    // default for now
    date = relativeDays({});
  }

  return format(date, dateFormat);
}

function relativeDays({ from = -500000, to = 50000 }) {
  console.log(from, to);

  let d = new Date();

  if (from > to) {
    from = -50000;
    to = 50000;
  }

  const r = randomIntFromInterval(from, to);
  console.log(r);

  if (d < 0) {
    d = subDays(d, r);
  } else {
    d = addDays(d, r);
  }
  return d;
}

function dateRange(fromDateString, toDateString, format) {
  try {
    const fromDate = parse(fromDateString, format, new Date());
    const toDate = parse(toDateString, format, new Date());

    const now = new Date();
    const from = differenceInCalendarDays(fromDate, now);
    const to = differenceInCalendarDays(toDate, now);
    return relativeDays({ from, to });
  } catch (e) {
    console.log(e.toString());
    return null;
  }
}
