import { Constants } from "./constants";
import * as cheerio from "cheerio";
import type { ServerResponse } from "worktop/response";

export async function checkNyaaUrl(): Promise<string> {
  try {
    const resp = await fetch(Constants.NyaaBaseUrl);

    console.log("NyaaBaseUrl Status:", resp.statusText);

    if (resp.status === 200) {
      return Constants.NyaaBaseUrl;
    } else {
      return Constants.NyaaAltUrl;
    }
  } catch (error) {
    console.log("NyaaBaseUrl Error:", error ?? "Something went wrong.");
    return Constants.NyaaAltUrl;
  }
}

export async function fileInfoScraper(res: ServerResponse, url: string) {
  const responseBody = await fetch(url).then((res) => res.text());

  let $ = cheerio.load(responseBody);
}
