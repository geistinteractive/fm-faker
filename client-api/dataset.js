import useSWR, { trigger } from "swr";
import fetch from "isomorphic-unfetch";
import sortBy from "lodash.sortby";

export function useDataSets() {
  const fetcher = url => {
    return fetch(url).then(r => {
      return r.json();
    });
  };
  return useSWR("/api/dataset", fetcher, {
    dedupingInterval: 5000,
    refreshInterval: 20000
  });
}

export function useDataset(id) {
  const fetcher = url => {
    return fetch(url)
      .then(r => {
        return r.json();
      })
      .then(data => {
        const tables = data.data.tables.data;
        const sorted = sortBy(tables, t => t.data.name);
        data.data.tables.data = sorted;

        return data;
      });
  };

  return useSWR(`/api/dataset/${id}`, fetcher);
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

export async function deleteById(id) {
  const url = "/api/dataset";

  try {
    await fetch(`${url}/${id}`, {
      method: "Delete"
    });
    trigger(url); // revalidate datasets
    return true;
  } catch (e) {
    console.log(e);

    return false;
  }
}
