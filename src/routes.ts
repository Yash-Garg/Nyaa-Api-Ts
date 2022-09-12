import { Handler } from "worktop";
import * as Scrapers from "./scrapers";
import { Constants } from "./constants";
import * as Utils from "./utils";

const baseUrl = Constants.NyaaAltUrl;

export class Handlers {
  static Ping: Handler = function (_, res) {
    res.send(200, "Nyaa API v2 // Alive");
  };

  static GetInfoFromID: Handler = async function (req, res) {
    try {
      const { id } = req.params;
      const searchUrl = baseUrl + "/view/" + id;

      await Scrapers.fileInfoScraper(res, searchUrl);
    } catch (error) {
      res.send(404, "Not Found");
    }
  };

  static GetUserUploads: Handler = async function (req, res) {
    try {
      const username = req.params.username;
      const queryParams = Utils.getSearchParameters(req);

      const searchUrl = `${baseUrl}/user/${username}?q=${queryParams.query.trim()}&p=${
        queryParams.page
      }&s=${queryParams.sort}&o=${queryParams.order}&f=${queryParams.filter}`;

      await Scrapers.scrapeNyaa(res, searchUrl);
    } catch (error) {
      res.send(404, "Not Found");
    }
  };

  static GetCategoryTorrents: Handler = async function (req, res) {
    try {
      const cat = req.params.category;
      const subCat = req.params.subcategory;

      const category = Utils.getCategoryID(cat, subCat);
      const queryParams = Utils.getSearchParameters(req);

      const searchUrl = `${baseUrl}?q=${queryParams.query.trim()}&c=${category}&p=${
        queryParams.page
      }&s=${queryParams.sort}&o=${queryParams.order}&f=${queryParams.filter}`;

      await Scrapers.scrapeNyaa(res, searchUrl);
    } catch (error) {
      res.send(404, "Not Found");
    }
  };
}
