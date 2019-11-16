import auth0 from "../../../services/auth0";

export default async (req, res) => {
  const { user } = await auth0.getSession(req);

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  const { method } = req;
  if (method === "GET") {
    res.end(JSON.stringify({ method: method, id: id }));
  } else if (method === "PUT") {
    res.end(JSON.stringify({ method: method, id: id }));
  }
};
