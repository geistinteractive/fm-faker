import s from "../../../schema/generateDataSet";

export default async (req, res) => {
  const name = req.query.dataset;
  const result = await s(name);

  res.setHeader("Content-Disposition", `attachment; filename="${name}.json"`);
  res.statusCode = 200;

  res.end(JSON.stringify(result));
};
