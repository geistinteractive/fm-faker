import File from "./lastSet.json";
import client from "./api-services/db/client";
import { query as q } from "faunadb";
import { createFMFile } from "./api-services/db/schema/fm_file_createUDF";
import { deleteFile } from "./api-services/db/schema/fm_file_deleteUDF";

import data from "./lastSet.json";

import { FilesQ, createTest } from "./api-services/db/schema/fm_file_getUDF";

const {
  Create,
  Collection,
  Get,
  Ref,
  Map,
  Paginate,
  Index,
  Lambda,
  Match,
  Select,
  Var,
  Let,
  Do,
  Obj,
  Delete,
  Query,
  CreateFunction,
  Update,
  Call
} = q;

const deletor = async () => {
  try {
    const r = await deleteFile("249684523940315658");
    console.log(r);
  } catch (e) {
    console.log(e);
  }
};

const creator = async () => {
  try {
    const r = await createFMFile(data);
    console.log(r);
  } catch (e) {
    console.log(e);
  }
};

const tester = async () => {
  try {
    const r = await client.query(FilesQ);
    const d = r.data[0];
    console.log(JSON.stringify(d, null, " "));
  } catch (e) {
    console.log(e);
  }
};

const updaterFn = async () => {
  try {
    const r = await createTest();
    console.log(r);
  } catch (e) {
    console.log(e);
  }
};

const caller = async () => {
  try {
    const r = await client.query(FilesQ);
    const d = r.data[0];
    console.log(JSON.stringify(d, null, " "));
  } catch (e) {
    console.log(e);
  }
};

tester();
