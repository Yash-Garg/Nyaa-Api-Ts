import { checkNyaaUrl } from "./utils";
import { Handler } from "worktop";

export const Ping: Handler = function (_, res) {
  res.send(200, "Nyaa API v2 // Alive");
};

export const GetInfoFromID: Handler = async function (req, res) {
  const { id } = req.params;
  const baseUrl = await checkNyaaUrl();

  const searchUrl = baseUrl + "/view/" + id;
  res.send(200, searchUrl);
};

export const GetUserUploads: Handler = function (req, res) {};

export const GetCategoryTorrents: Handler = function (req, res) {};
