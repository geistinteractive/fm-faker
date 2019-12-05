import { parse, format, differenceInSeconds, addSeconds } from "date-fns";
import { randomIntFromInterval } from "./utils";

export default function fmTime(value, schema) {
  let theFormat = "H:mm:ss";
  if (value.format) theFormat = value.format;

  let DayBegin = parse("0:00:00", "H:mm:ss", new Date());
  let minTimeInSeconds = 0;
  let maxTimeInSeconds = 86399;

  if (value.range) {
    if (value.range.from) {
      let minTime = parse(value.range.from, theFormat, new Date());

      minTimeInSeconds = differenceInSeconds(minTime, DayBegin);
    }
    if (value.range.to) {
      let maxTime = parse(value.range.to, theFormat, new Date());
      maxTimeInSeconds = differenceInSeconds(maxTime, DayBegin);
    }
  }

  const randomSeconds = randomIntFromInterval(
    minTimeInSeconds,
    maxTimeInSeconds
  );

  const time = addSeconds(DayBegin, randomSeconds);

  return format(time, theFormat);
}
