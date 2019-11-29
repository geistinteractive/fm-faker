import { Table } from "reactstrap";
export default function SmallBorderedTable({ children }) {
  return (
    <Table
      size="sm"
      style={{ border: "1px solid #dee2e6", backgroundColor: "white" }}
    >
      {children}
    </Table>
  );
}
