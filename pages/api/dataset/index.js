import { checkUser } from "../../../api-services/auth0";
import methods from "../../../utils/middleware/methods";
import {
  createDataset,
  getDatasetsByUser
} from "../../../api-services/db/dataset";

export default checkUser(
  methods({
    GET: async (req, res) => {
      const userId = req.user.sub;
      const results = await getDatasetsByUser(userId);
      res.statusCode = 200;
      return res.json(results);
    },
    POST: async (req, res) => {
      const data = req.body;
      data.userId = req.user.sub;

      let result = await createDataset(data);

      res.json(result);
    }
  })
);
