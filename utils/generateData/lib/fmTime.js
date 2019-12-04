import { parse, format } from "date-fns";
import { randomIntFromInterval } from "./utils";

export default function fmTime(value, schema) {
  let theFormat = "H:mm:ss";

  const hour = randomIntFromInterval(0, 24);
  const minute = randomIntFromInterval(0, 59);
  const sec = randomIntFromInterval(0, 59);

  const time = parse(`${hour}:${minute}:${sec}`, theFormat, new Date());

  return format(time, theFormat);
}
