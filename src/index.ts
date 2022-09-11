import { listen, Router } from "worktop";
import * as CORS from "worktop/cors";
import { aliveHandler } from "./routes";

const API = new Router();

API.prepare = CORS.preflight({
  origin: "*", // allow any `Origin` to connect
  headers: ["Cache-Control", "Content-Type", "X-Count"],
  methods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
});

API.add("GET", "/", aliveHandler);

listen(API.run);
