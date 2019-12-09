import client from "./client";
import { query as q } from "faunadb";

const { Collection, Ref, Update } = q;

export function saveTableRecords(id, data) {
  const ref = Ref(Collection("fm_table"), id);
  const obj = { data: { minimum: data.minimum, maximum: data.maximum } };
  const updateQuery = Update(ref, obj);
  return client.query(updateQuery);
}
