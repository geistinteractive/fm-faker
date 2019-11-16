import { getDataSets } from "./services/db/test";

getDataSets().then(r => {
  console.log(r);
});
