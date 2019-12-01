import { checkUser } from "../../../api-services/auth0";
import methods from "../../../utils/middleware/methods";
import { saveFieldSchema } from "../../../api-services/db/field-service";

export default checkUser(
  methods({
    PATCH: async (req, res) => {
      const id = req.query.id;
      const data = req.body;

      console.log("patch", id, data);

      const results = await saveFieldSchema(id, data);
      res.statusCode = 200;
      return res.json(results);
    }
  })
);
