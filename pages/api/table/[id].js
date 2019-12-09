import { checkUser } from "../../../api-services/auth0";
import methods from "../../../utils/middleware/methods";
import { saveTableRecords } from "../../../api-services/db/table-service";

export default checkUser(
  methods({
    PATCH: async (req, res) => {
      const id = req.query.id;
      const data = req.body;
      const results = await saveTableRecords(id, data);
      res.statusCode = 200;
      return res.json(results);
    }
  })
);
