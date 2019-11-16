import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
//import EditTypeField from "../EditTypeField";
import generateData from "../../utils/generateData";

const EditTypeField = dynamic(
  () => {
    import("../EditTypeField");
  },
  { ssr: false }
);

export default function FieldRow({ data, onValidChange }) {
  if (!data) return null;
  const [generated, setGenerated] = useState();

  const { id, name, exampleData } = data;

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
      <td>
        <EditTypeField
          onValidChange={exampleData => {
            onValidChange({ ...data, exampleData });
          }}
          value={exampleData}
        ></EditTypeField>
      </td>
      <td>{generated}</td>
    </tr>
  );
}
