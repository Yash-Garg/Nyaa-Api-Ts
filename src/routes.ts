import { checkNyaaUrl } from "./utils";
import { Handler } from "worktop";
import { fileInfoScraper } from "./utils";

export class Handlers {
  static Ping: Handler = function (_, res) {
    res.send(200, "Nyaa API v2 // Alive");
  };

  static GetInfoFromID: Handler = async function (req, res) {
    const { id } = req.params;
    const baseUrl = await checkNyaaUrl();
    const searchUrl = baseUrl + "/view/" + id;

    await fileInfoScraper(res, searchUrl);
  };

  static GetUserUploads: Handler = function (req, res) {};

  static GetCategoryTorrents: Handler = function (req, res) {};
}
