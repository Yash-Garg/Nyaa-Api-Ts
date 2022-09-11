import axios from "axios";
import * as Constants from "./constants";

export async function checkNyaaUrl(): Promise<string> {
  try {
    const { status } = await axios.get(Constants.NyaaBaseUrl);

    console.log("NyaaBaseUrl Status: ", status);

    if (status === 200) {
      return Constants.NyaaBaseUrl;
    } else {
      return Constants.NyaaAltUrl;
    }
  } catch (error) {
    console.log("NyaaBaseUrl Error:", error.message ?? "Something went wrong.");
    return Constants.NyaaAltUrl;
  }
}
