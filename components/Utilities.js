import React from "react";

export function VSpace({ h }) {
  h = h ? h : "10px";
  return <div style={{ height: h }} />;
}

export function InlineLink(props) {
  const { onClick, children, ...rest } = props;
  return (
    <a
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
      href=""
    >
      {children}
    </a>
  );
}
