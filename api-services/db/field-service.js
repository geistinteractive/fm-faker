import client from "./client";
import { query as q } from "faunadb";

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
  Var,
  Let,
  Select,
  Do,
  Update
} = q;

export async function saveFieldSchema(id, schemaOverride) {
  const ref = Ref(Collection("fm_field"), id);
  const obj = { data: { schemaOverride } };

  const nullItObj = { data: { schemaOverride: null } };
  const updateQuery = Do(Update(ref, nullItObj), Update(ref, obj));
  try {
    return await client.query(updateQuery);
  } catch (e) {
    console.log(e.toString());
    throw e;
  }
}
