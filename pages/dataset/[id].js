import React from "react";
import { useRouter } from "next/router";

import DatasetManager from "../../components/DatasetManager/";

export default function DataSet() {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return <p>loading...</p>;

  return (
    <>
      <DatasetManager dataSetId={id} />
    </>
  );
}
