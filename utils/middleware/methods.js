export default ({ POST, GET, PUT, DELETE, PATCH }) => {
  return (req, res) => {
    const { method } = req;

    console.log("api-recieved", method);

    if (method === "GET") return GET(req, res);
    if (method === "POST") return POST(req, res);
    if (method === "PUT") return PUT(req, res);
    if (method === "PATCH") return PATCH(req, res);
    if (method === "DELETE") return DELETE(req, res);
  };
};
