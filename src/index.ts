import { listen, Router } from "worktop";
import * as CORS from "worktop/cors";
import * as Routes from "./routes";

const API = new Router();

API.prepare = CORS.preflight({
  origin: "*",
  headers: ["Cache-Control", "Content-Type"],
  methods: ["GET"],
});

API.add("GET", "/", Routes.PingApi);
API.add("GET", "/id/:id", Routes.GetInfoFromID);
API.add("GET", "/user/:username", Routes.GetUserUploads);
API.add("GET", "/:category/:sub_category?", Routes.GetCategoryTorrents);

listen(API.run);
