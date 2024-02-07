import axios from "axios";
import { router } from "expo-router";
import { useCallback, useState } from "react";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
interface CallParams {
  method: HttpMethod;
  url: string;
  data?: object;
}

interface CallData {
  data?: object;
  params?: object;
}

// default URL that can be changed for specific URL
const CRONOS_URL = `${
  process.env.EXPO_PUBLIC_CRONOS_API ?? "http://localhost"
}/api`;

export const useAPI = (baseURL: string = CRONOS_URL) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [headers, setHeaders] = useState(() => {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  });

  const call = useCallback(async ({ method, url, data = {} }: CallParams) => {
    setLoading(true);

    if (__DEV__) console.log(`🛎️ - ${method} - ${baseURL + url}`);

    // adapt the calldata for the HTTP method
    const callData: CallData = ["GET", "DELETE"].includes(method)
      ? { params: data }
      : { data };

    try {
      const { config, data, request, status, statusText } = await axios({
        method,
        baseURL,
        url,
        headers,
        ...callData,
      });

      if (__DEV__) {
        console.log("📀📀 - Request Response");
        console.log("📀 - config", config);
        console.log("📀 - data", data.data);
        console.log("📀 - metadata", data.metadata);
        console.log("📀 - request", request);
        console.log(`📀 - status: ${status} - ${statusText}`);
        console.log("📀📀 - End Request Response");
      }

      return data.data;
    } catch (error) {
      if (__DEV__) console.error("🔥 - error", error);

      if (error.code === "ERR_NETWORK") {
        if (__DEV__) console.error("ERR_NETWORK");
        // TODO: GO TO OFFLINE PAGE
        return;
      }

      switch (error.response?.status) {
        case 400:
          if (__DEV__) console.error("BAD REQUEST");
          break;

        case 401:
          if (__DEV__) console.error("TOKEN NOT VALID");
          break;

        case 403:
          if (__DEV__)
            console.error("USER DO NOT HAVE ACCESS TO THIS RESOURCE");
          break;

        case 405:
          if (__DEV__) console.error("METHOD NOT ALLOWED");
          break;

        case 429:
          if (__DEV__) console.error("TOO MANY REQUESTS");
          break;

        case 500:
          if (__DEV__) console.error("INTERNAL SERVER ERROR");
          // TODO: GO TO OFFLINE PAGE
          break;

        case 503:
          if (__DEV__) console.error("SERVICE UNAVAILABLE");
          // TODO: GO TO OFFLINE PAGE
          break;

        default:
        // error not handled here
      }
      throw error.response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, call };
};
