import { checkUser } from "../../../api-services/auth0";
import methods from "../../../utils/middleware/methods";

export default checkUser(
  methods({
    GET: (req, res) => {
      res.statusCode = 200;
      return res.json({ method: "GET" });
    },
    POST: (req, res) => {
      const data = req.body;
      data.userId = req.user.sub;
      res.json({ method: "GET" });
    }
  })
);
