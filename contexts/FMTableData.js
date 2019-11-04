import React, { createContext, useContext } from "react";

const FMTableData = createContext();

export default FMTableData;

export const useFMTableData = () => {
  const { fmTables, setFMTables } = useContext(FMTableData);
  return { fmTables, setFMTables };
};
