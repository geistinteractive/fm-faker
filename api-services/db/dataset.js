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
  Var
} = q;

const datasets = Collection("DataSets");

export async function createDataset(data) {
  const result = await client.query(Create(datasets, { data }));
  return result;
}

export async function getDatasetsByUser(user) {
  const findDataSetByUserQuery = Map(
    Paginate(Match(Index("datasets_by_user"), "twitter|14164578")),
    Lambda("dataset", Get(Var("dataset")))
  );
  const result = await client.query(findDataSetByUserQuery);
  return result;
}

export async function getDataSetById(id) {
  const myQuery = Get(Ref(datasets, id));
  const result = await client.query(myQuery);

  return result;
}
