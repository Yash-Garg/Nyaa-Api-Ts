import { Handler } from "worktop";
import * as Scrapers from "./scrapers";
import { Constants } from "./constants";
import * as Utils from "./utils";

export class Handlers {
  static Ping: Handler = function (_, res) {
    res.send(200, "Nyaa API v2 // Alive");
  };

  static GetInfoFromID: Handler = async function (req, res) {
    const { id } = req.params;
    // const baseUrl = await checkNyaaUrl();
    const searchUrl = Constants.NyaaAltUrl + "/view/" + id;

    await Scrapers.fileInfoScraper(res, searchUrl);
  };

  static GetUserUploads: Handler = async function (req, res) {
    const username = req.params.username;
    const queryParams = Utils.getSearchParameters(req);

    const searchUrl = `${
      Constants.NyaaAltUrl
    }/user/${username}?q=${queryParams.query.trim()}&p=${queryParams.page}&s=${
      queryParams.sort
    }&o=${queryParams.order}&f=${queryParams.filter}`;

    await Scrapers.scrapeNyaa(res, searchUrl);
  };

  static GetCategoryTorrents: Handler = async function (req, res) {
    const cat = req.params.category;
    // const subCat = req.params.subcategory;

    // TODO: Fix subcategory conditions
    const category = Utils.getCategoryID(cat, undefined);
    const queryParams = Utils.getSearchParameters(req);

    const searchUrl = `${
      Constants.NyaaAltUrl
    }?q=${queryParams.query.trim()}&c=${category}&p=${queryParams.page}&s=${
      queryParams.sort
    }&o=${queryParams.order}&f=${queryParams.filter}`;

    await Scrapers.scrapeNyaa(res, searchUrl);
  };
}
