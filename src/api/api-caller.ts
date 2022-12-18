import qs from "qs";
import environments from "../environments";

const HOST = environments.HOST;

export class ResponseError {
  message: string;
  code: string;
  _err: string;
  constructor(errorData) {
    this.message = errorData.message;
    this.code = errorData.code;
    this._err = errorData;
  }
}

export default async function apiCaller(
  endpoint,
  options = {
    method: "GET",
    headers: {},
    query: undefined,
    params: undefined,
    body: undefined,
  }
) {
  let token = "";

  const opt = {
    method: options.method,
    headers: {
      token: `${token}`,
      ...options.headers,
    },
  };

  if (!options.auth) {
    delete opt.Authorization;
  }

  let url = `${HOST}${endpoint}`;

  if (options.query) {
    url += `?${qs.stringify(options.query)}`;
  }

  if (options.body) {
    if (options.body instanceof FormData) {
      opt.body = options.body;
    } else {
      opt.headers["Content-Type"] = "application/json";
      opt.body = JSON.stringify(options.body);
    }
  }

  if (options.params) {
    Object.keys(options.params).forEach((key) => {
      url = url.replace(`:${key}`, options.params[key]);
    });
  }

  try {
    const response = await fetch(url, opt);
    let jsonResponse;
    const contentType = response.headers.get("content-type");

    if (contentType.includes("application/json")) {
      jsonResponse = await response.json();
    } else if (contentType.includes("text/csv")) {
      jsonResponse = await response.blob();
    } else {
      jsonResponse = await response.text();
    }

    if (response.ok) {
      return jsonResponse;
    }

    throw new ResponseError(jsonResponse);
  } catch (error) {
    throw error instanceof ResponseError
      ? error
      : new ResponseError({ code: 500 });
  }
}
