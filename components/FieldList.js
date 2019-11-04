import { useFMTableData } from "../contexts/FMTableData";
import { Table } from "reactstrap";

export function FieldList({ table }) {
  table = table ? table : { fields: [] };

  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Id</th>
          <th>FieldName</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {table.fields.map(data => {
          return <TableRow key={data.id} data={data}></TableRow>;
        })}
      </tbody>
    </Table>
  );
}

function TableRow({ data }) {
  const { id, name, type } = data;
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{type}</td>
    </tr>
  );
}
