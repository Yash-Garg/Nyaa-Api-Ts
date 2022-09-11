import { Handler } from "worktop";

export const aliveHandler: Handler = function (_, res) {
  res.send(200, "Nyaa API v2 // Alive");
};
