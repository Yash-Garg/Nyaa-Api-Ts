import { Constants } from "./constants";
import * as cheerio from "cheerio";
import type { ServerResponse } from "worktop/response";
import * as Models from "./models";

export async function fileInfoScraper(res: ServerResponse, url: string) {
  const responseBody = await fetch(url).then((res) => res.text());

  const $ = cheerio.load(responseBody);
  const container = $("body div.container").last();

  const torrentData: Models.Torrent = {
    title: container.find("h3.panel-title").first().text().trim(),
    file:
      Constants.NyaaBaseUrl + container.find("div.panel-footer a").attr("href"),
    link: url,
    id: Number(url.split("/")[4]),
    magnet: container.find("div.panel-footer a:nth-child(2)").attr("href")!,
    size: container
      .find("div.panel-body div.row:nth-child(4) .col-md-5:nth-child(2)")
      .text()
      .trim(),
    category: container
      .find("div.panel-body div.row:nth-child(1) .col-md-5:nth-child(2)")
      .text()
      .trim(),
    uploaded: container
      .find("div.panel-body div.row:nth-child(1) .col-md-5:nth-child(4)")
      .text()
      .trim(),
    seeders: Number(
      container
        .find("div.panel-body div.row:nth-child(2) .col-md-5:nth-child(4)")
        .text()
        .trim()
    ),
    leechers: Number(
      container
        .find("div.panel-body div.row:nth-child(3) .col-md-5:nth-child(4)")
        .text()
        .trim()
    ),
    completed: Number(
      container
        .find("div.panel-body div.row:nth-child(4) .col-md-5:nth-child(4)")
        .text()
        .trim()
    ),
  };

  const commentCount = Number(
    container.find("div#comments h3.panel-title").text().split("-").at(-1)
  );

  let comments: Models.Comment[] = [];
  if (commentCount > 0) {
    container
      .find("div.container div#comments div.comment-panel")
      .each((_, selection) => {
        // const comment: Models.Comment = {
        //   name: "",
        //   content: "",
        //   image: "",
        //   timestamp: "",
        // };
        // comments.push(comment);
      });
  }

  const file: Models.File = {
    torrent: torrentData,
    description: container.find("div.panel-body#torrent-description").text(),
    submittedBy: container
      .find("div.panel-body div.row:nth-child(2) .col-md-5:nth-child(2)")
      .text()
      .trim(),
    infoHash: container
      .find("div.panel-body div.row:nth-child(5) .col-md-5:nth-child(2)")
      .text()
      .trim(),
    commentInfo: {
      count: commentCount,
      comments: comments,
    },
  };

  res.send(200, file);
}
