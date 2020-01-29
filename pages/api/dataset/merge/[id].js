import { checkUser } from "../../../../api-services/auth0";
import methods from "../../../../utils/middleware/methods";

export default checkUser(
  methods({
    POST: async (req, res) => {
      const data = req.body;
      console.log(data);

      const id = req.query.id;
      const results = { message: "ok" };
      res.statusCode = 200;
      return res.json(results);
    }
  })
);
