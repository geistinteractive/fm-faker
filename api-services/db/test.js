import client from "./client";
import { query as q } from "faunadb";

export function getDataSets() {


  const { Map, Paginate, Index, Lambda, Match, Get, Var } = q;

  return client.query(
    Map(Paginate(Match(Index("all_datasets"))), Lambda("z", Get(Var("z"))))
  )
}
