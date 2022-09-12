import { ServerRequest } from "worktop/request";
import { Constants } from "./constants";
import { QueryParams } from "./models";

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

export function getCategoryID(c: string, s: string): string {
  if (s.length === 0) {
    return Constants.NyaaEndpoints[c]["all"];
  } else if (c == "all") {
    return "";
  } else {
    return Constants.NyaaEndpoints[c][s];
  }
}

export function getSearchParameters(req: ServerRequest): QueryParams {
  const q: string | null = (req.query.get("q") ?? "").replaceAll(" ", "+");
  const p: number | null = Number(req.query.get("p"));
  const o: string | null = req.query.get("o") ?? "";
  const f: number | null = Number(req.query.get("f"));
  let s: string | null = req.query.get("s") ?? "";

  if (s == "date") {
    s = "id";
  }

  return <QueryParams>{ query: q, page: p, order: o, sort: s, filter: f };
}
