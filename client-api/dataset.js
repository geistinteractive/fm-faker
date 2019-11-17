import useSWR, { trigger } from "swr";
import fetch from "isomorphic-unfetch";

export function useDataSets() {
  const fetcher = url => {
    return fetch(url)
      .then(r => {
        return r.json();
      })
      .catch(e => {
        console.log(e);
      });
  };
  return useSWR("/api/dataset", fetcher, {
    dedupingInterval: 5000,
    refreshInterval: 20000
  });
}

export function useDataset(id) {
  const fetcher = url => {
    return fetch(url).then(r => {
      return r.json();
    });
  };

  if (!id) {
    //must return a promise to indicate that nothing can be fetched yet
    return new Promise((resolve, reject) => {
      resolve({ data: null, error: null });
    });
  }
  return useSWR(`/api/dataset/${id}`, fetcher, {
    refreshInterval: 200000
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
