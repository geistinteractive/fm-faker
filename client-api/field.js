import { trigger } from "swr";
import fetch from "isomorphic-unfetch";

export async function saveSchemaOverride(id, data, dataSetId) {
  const url = `/api/field/${id}`;

  try {
    await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    trigger(`/api/dataset${dataSetId}`); // revalidate datasets
    return true;
  } catch (e) {
    console.log(e);

    return false;
  }
}
