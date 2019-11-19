import React, { useEffect, useState } from "react";
import generateData from "../../utils/generateData";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("../EditTypeField"), {
  ssr: false
});

export default function FieldRow({ data, onValidChange }) {
  const [generated, setGenerated] = useState();
  data.exampleData = { type: "string" };
  const { id, name, exampleData, sample, schema, datatype } = data;

  useEffect(() => {
    async function generate() {
      const data = await generateData(exampleData);
      setGenerated(data);
    }
    generate();
  }, [data]);

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{datatype}</td>
      <td>
        <DynamicComponentWithNoSSR
          onValidChange={exampleData => {}}
          schema={schema}
        ></DynamicComponentWithNoSSR>
      </td>
      <td>{sample}</td>
    </tr>
  );
}
