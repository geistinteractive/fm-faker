import { Container, Col, Row, Card, CardBody, CardHeader } from "reactstrap";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DatasetManager from "../../components/DatasetManager/";

export default function DataSet() {
  return (
    <>
      <DatasetManager dataSetId={"249248032513589769"} />
    </>
  );
}
