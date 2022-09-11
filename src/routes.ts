import { Handler } from "worktop";

export const PingApi: Handler = function (_, res) {
  res.send(200, "Nyaa API v2 // Alive");
};

export const GetInfoFromID: Handler = function (req, res) {};

export const GetUserUploads: Handler = function (req, res) {};

export const GetCategoryTorrents: Handler = function (req, res) {};
