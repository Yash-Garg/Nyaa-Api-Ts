import { Constants } from "./constants";

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
