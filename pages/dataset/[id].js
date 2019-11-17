import { Container, Col, Row, Card, CardBody, CardHeader } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDataset } from "../../client-api/dataset";
import TableList from "../../components/TableList";

function TableManager() {}

export default function DataSet() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useDataset(id);

  if (error) return <p>Error: {error.toString()}</p>;
  if (!data) return null;

  return (
    <>
      <TableList data={data} />
    </>
  );
}
