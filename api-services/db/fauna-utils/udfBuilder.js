import client from "../client";
import { query as q } from "faunadb";
const { Call, Update, CreateFunction } = q;

export default function udf(name, query) {
  function updateFn() {
    return client.query(
      q.Select(
        "ref",
        Update(q.Function(name), {
          body: query
        })
      )
    );
  }

  function createFn() {
    return client.query(
      q.Select(
        "ref",
        CreateFunction({
          name: name,
          body: query
        })
      )
    );
  }

  async function createOrUpdateFn() {
    try {
      return await createFn();
    } catch (e) {
      //console.log(e);

      return updateFn();
    }
  }

  function deleteFn() {
    return client.query(q.Select("ref", q.Delete(q.Function(name))));
  }

  function callFn() {
    return client.query(Call(name, ...arguments));
  }

  return {
    callFn,
    deleteFn,
    updateFn,
    createFn,
    createOrUpdateFn
  };
}
