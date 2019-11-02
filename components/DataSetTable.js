import React from "react";
import { Table, Row } from "reactstrap";
import { downloadFiles } from "../utils/downloadFiles";
import { useAsync } from "react-use";
import fetch from "isomorphic-fetch";
import { Button } from "reactstrap";

export default function DataSetTable() {
  const state = useAsync(async () => {
    const response = await fetch("/api/datasets");
    const result = await response.json();
    return result;
  });

  return (
    <Table borderless>
      <TableHead></TableHead>
      <TableBody rows={state.value}></TableBody>
    </Table>
  );
}

function TableHead() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Downloads</th>
      </tr>
    </thead>
  );
}

function TableBody({ rows }) {
  if (!rows || rows.length < 1) {
    rows = [{ link: "d" }];
  }
  return rows.map((row, i) => {
    return (
      <tbody>
        <TableRow key={i} row={row} />
      </tbody>
    );
  });
}

function TableRow({ row }) {
  return (
    <tr>
      <td>{row.name}</td>
      <td>
        <DownloadButton
          onClick={() => {
            downloadFiles(row.link);
          }}
        >
          CSV
        </DownloadButton>
        <DownloadButton
          onClick={() => {
            window.location.href = `/api/generate/${row.link}`;
          }}
        >
          JSON
        </DownloadButton>
      </td>
    </tr>
  );
}

function DownloadButton(props) {
  const { children, ...rest } = props;

  return (
    <Button
      color="success"
      {...rest}
      style={{ marginRight: "6px" }}
      size={"sm"}
    >
      {children}
    </Button>
  );
}
