import {
  parse,
  format,
  differenceInSeconds,
  addSeconds,
} from "date-fns";
import { randomIntFromInterval } from "./utils";

export default function fmTime(value, schema) {
  let theFormat = "MM/dd/yyyy H:mm:ss";
  if (value.format) theFormat = value.format;

  let DayBegin = parse("01/01/0001 0:00:00", "MM/dd/yyyy H:mm:ss", new Date());
  let minTimeInSeconds = 0;
  let maxTimeInSeconds = 60 * 60 * 24 * 365 * 4000;

  if (value.range) {
    if (value.range.from) {
      let minTime = parse(value.range.from, theFormat, new Date());

      minTimeInSeconds = differenceInSeconds(minTime, DayBegin);
    }
    if (value.range.to) {
      let maxTime = parse(value.range.to, theFormat, new Date());
      maxTimeInSeconds = differenceInSeconds(maxTime, DayBegin);
    }

    const randomSeconds = randomIntFromInterval(
      minTimeInSeconds,
      maxTimeInSeconds
    );

    const time = addSeconds(DayBegin, randomSeconds);

    return format(time, theFormat);
  } else if (value.relativeDays) {
    let minDays = -365 * 2000;
    let maxDays = 365 * 2000;

    if (value.relativeDays.from !== undefined)
      minDays = value.relativeDays.from;
    if (value.relativeDays.to !== undefined) maxDays = value.relativeDays.to;

    const rDays = randomIntFromInterval(minDays, maxDays);
    const secondsToAdd = rDays * 84600;

    const timestamp = addSeconds(new Date(), secondsToAdd);
    return format(timestamp, theFormat);
  }
}
