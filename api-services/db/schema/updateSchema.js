import { updateDeleteFileFn } from "./fm_file_deleteUDF";
import { updateFMFileCreateFn } from "./fm_file_createUDF";

updateFMFileCreateFn()
  .then(r => {
    console.log(JSON.stringify(r, null, "  "));
  })
  .catch(e => {
    console.log(e.requestResult.responseContent);
  });
