import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const TableList = ({ onClick, data }) => {
  const fmTables = data.data.tables;

  return (
    <ListGroup size="sm">
      {fmTables.map(i => {
        let active = false;
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
