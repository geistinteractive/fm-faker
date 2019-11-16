import { Container, Col, Row, Card, CardBody, CardHeader } from "reactstrap";
import React from "react";
import { useRouter } from "next/router";

function TableManager() {}

export default function DataSet() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div>{id}</div>
    </>
  );
}
