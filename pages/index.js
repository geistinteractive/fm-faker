import React from "react";
import LoggedInHome from "../components/LoggedInHome";
import useMe from "../client-api/useMe";

export default function Home() {
  const { data, error } = useMe();

  const loggedIn = data && data.error !== "not_authenticated";

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (loggedIn) return <LoggedInHome />;
  return <LoggedOutHome />;
}

function LoggedOutHome() {
  return <p>logged out</p>;
}
