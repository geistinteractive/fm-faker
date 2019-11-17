export default ({ POST, GET, PUT, DELETE }) => {
  return (req, res) => {

    const { method } = req;
    if (method === "GET") return GET(req, res);
    if (method === "POST") return POST(req, res);
    if (method === "PUT") return PUT(req, res);
    if (method === "DELETE") return DELETE(req, res);
  };
};
