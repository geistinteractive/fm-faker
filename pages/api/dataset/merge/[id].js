import { checkUser } from "../../../../api-services/auth0";
import methods from "../../../../utils/middleware/methods";
import { merge } from "../../../../api-services/db/dataset";

export default checkUser(
  methods({
    POST: async (req, res) => {
      const data = req.body;

      const id = req.query.id;
      const r = await merge(id, data);

      const results = { message: "ok" };
      res.statusCode = 200;
      return res.json(results);
    }
  })
);
