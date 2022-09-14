import { Constants } from "./constants";
import * as cheerio from "cheerio";
import type { ServerResponse } from "worktop/response";
import * as Models from "./models";

export async function fileInfoScraper(res: ServerResponse, url: string) {
  const response = await fetch(url);

  if (response.status === 200) {
    const responseBody = await response.text();

    const $ = cheerio.load(responseBody);
    const container = $("body div.container").last();
    const fileId = Number(url.split("/")[4])

    const torrentData: Models.Torrent = {
      title: container.find("h3.panel-title").first().text().trim(),
      file:
        Constants.NyaaBaseUrl +
        container.find("div.panel-footer a").attr("href"),
      link: `${Constants.NyaaBaseUrl}/view/${fileId}`,
      id: fileId,
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
        .find("div#comments div.comment-panel div.panel-body")
        .each((_, selection) => {
          const element = $(selection);

          const comment: Models.Comment = {
            name: element.find("a").first().text().trim(),
            content: element
              .find("div.comment-body div.comment-content")
              .text(),
            image:
              element.find("img.avatar").attr("src") ??
              Constants.DefaultProfilePic,
            timestamp: element.find("a").children().first().text(),
          };

          comments.push(comment);
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
  } else {
    res.send(404, "Not Found");
  }
}

export async function scrapeNyaa(res: ServerResponse, url: string) {
  const response = await fetch(url);

  if (response.status === 200) {
    const responseBody = await response.text();

    const $ = cheerio.load(responseBody);
    const table = $("tbody");

    let torrents: Models.Torrent[] = [];
    table.find("tr").each((_, selection) => {
      const row = $(selection);
      const torrentPath = row.find("td:nth-child(2) a").last().attr("href");
      const filePath = row.find("td:nth-child(3) a:nth-child(1)").attr("href");

      const torrent: Models.Torrent = {
        id: Number(torrentPath.split("/")[2]),
        title: row.find("td:nth-child(2) a").last().text(),
        link: Constants.NyaaBaseUrl + torrentPath,
        file: Constants.NyaaBaseUrl + filePath,
        category: row.find("td:nth-child(1) a").attr("title"),
        size: row.find("td:nth-child(4)").text(),
        uploaded: row.find("td:nth-child(5)").text(),
        seeders: Number(row.find("td:nth-child(6)").text()),
        leechers: Number(row.find("td:nth-child(7)").text()),
        completed: Number(row.find("td:nth-child(8)").text()),
        magnet: row.find("td:nth-child(3) a:nth-child(2)").attr("href"),
      };

      torrents.push(torrent);
    });

    res.send(200, torrents);
  } else {
    res.send(404, "Not Found");
  }
}
