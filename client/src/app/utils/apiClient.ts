const URL = "http://localhost:8000/";

type ApiClientPayload = {
  data?: any;
  headers?: Record<string, string>;
  formData?: any;
  signal?: any;
  method?: "GET" | "PUT" | "POST" | "DELETE" | "PATCH";
  rawResponse?: boolean;
  cache?: RequestCache;
  "Cache-Control"?: any;
  Cookie?: string;
  next?: { tags: string[] };
};

export async function apiClient(
  endPoint: string,
  {
    data,
    headers,
    signal,
    method,
    rawResponse,
    cache,
    "Cache-Control": cacheControl,
    Cookie,
  }: ApiClientPayload = {}
) {
  const options: RequestInit = {
    method: data || method ? method : "GET",
    body: data ? JSON.stringify(data) : undefined,
    signal,
    credentials: "include",
    headers: {
      ...(data && { "Content-Type": "application/json" }),
      "Cache-Control": cacheControl,
      Cookie,
      ...headers,
    },

    cache: cache,
  };

  const response = await fetch(`${URL}${endPoint}`, options);
  if (rawResponse) {
    return response;
  }

  if (response.status === 205) {
    localStorage.removeItem("user");

    window.location.assign("/registration");
    return Promise.reject("Please re-authenticate.");
  }

  const json = await response.json();
  if (response.ok) {
    return json;
  } else {
    console.log("REJECT", json);
    return Promise.reject({ json, status: response.status });
  }
}
