import express from "express"
import { statsRoute, deviationRoute} from "../controller/controller.js";
const routes = express.Router();

routes.route("/stats").get(statsRoute);
routes.route("/deviation").get(deviationRoute);

export default routes; 