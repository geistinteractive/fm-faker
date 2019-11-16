import React from "react";

export function VSpace({ h }) {
  h = h ? h : "10px";
  return <div style={{ height: h }} />;
}

