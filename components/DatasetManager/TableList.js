import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const TableList = ({ onClick, fmTables, selectedTableId }) => {
  return (
    <ListGroup size="sm">
      {fmTables.map(table => {
        const { id, name } = table;
        let active = id === selectedTableId;

        return (
          <ListGroupItem
            active={active}
            style={{ textAlign: "left" }}
            tag="button"
            key={name}
            action
            onClick={() => {
              onClick(id);
            }}
          >
            {name}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default TableList;
