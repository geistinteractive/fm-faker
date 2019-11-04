import React, { useContext } from "react";
import FMTableData from "../contexts/FMTableData";
import { ListGroup, ListGroupItem } from "reactstrap";

const TableList = ({ onClick, table }) => {
  const { fmTables } = useContext(FMTableData);
  console.log(table);

  return (
    <ListGroup>
      {fmTables.map(i => {
        let active = i === table;
        console.log(active);

        return (
          <ListGroupItem
            active={active}
            style={{ textAlign: "left" }}
            tag="button"
            key={i.name}
            action
            onClick={() => {
              onClick(i);
            }}
          >
            {i.name}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default TableList;
