import useSWR, { trigger } from "swr";
import fetch from "isomorphic-unfetch";
const fetcher = url => {
  return fetch(url)
    .then(r => {
      return r.json();
    })
    .catch(e => {
      console.log(e);
    });
};

export function useDataSets() {
  return useSWR("/demo-data/dev-datasets.json", fetcher, {
    dedupingInterval: 5000
  });
}

export async function saveNewDataSet(file) {
  const url = "/api/dataset";

  try {
    await fetch(url, {
      method: "post",
      body: JSON.stringify(file),
      headers: {
        "Content-Type": "application/json"
      }
    });
    trigger(url); // revalidate datasets
    return true;
  } catch (e) {
    console.log(e);

    return false;
  }
}
