import useSWR from "swr";
import fetch from "isomorphic-unfetch";
const fetcher = url => {
  return fetch(url).then(r => {
    return r.json();
  });
};

export default function useMe() {
  return useSWR("/api/me", fetcher, { dedupingInterval: 5000 });
}
