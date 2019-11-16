import readDataSets from "../../utils/readDataSets";

export default async (req, res) => {
  const result = readDataSets();

  res.setHeader("Content-Type", `application/json`);
  res.statusCode = 200;

  res.end(JSON.stringify(result));
};
