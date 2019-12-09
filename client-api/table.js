import fetch from "isomorphic-unfetch";

export async function saveTableRecords(id, data) {
  const url = `/api/table/${id}`;

  try {
    await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    return true;
  } catch (e) {
    return false;
  }
}
