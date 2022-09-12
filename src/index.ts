import { listen, Router } from "worktop";
import * as CORS from "worktop/cors";
import { Handlers } from "./routes";

const API = new Router();

API.prepare = CORS.preflight({
  origin: "*",
  headers: ["Cache-Control", "Content-Type"],
  methods: ["GET"],
});

API.add("GET", "/", Handlers.Ping);
API.add("GET", "/:category", Handlers.GetCategoryTorrents);
API.add("GET", "/:category/:subcategory", Handlers.GetCategoryTorrents);
API.add("GET", "/id/:id", Handlers.GetInfoFromID);
API.add("GET", "/user/:username", Handlers.GetUserUploads);

listen(API.run);
