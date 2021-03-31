import axios, { AxiosInstance } from "axios";
import { useGithubAccessToken } from "./hooks";

const DEFAULT_CONFIG = {
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
};

const client = axios.create(DEFAULT_CONFIG);

export default client;

export function clientWithAuthorizationToken(
  token: string
): AxiosInstance | null {
  if (!token) {
    return null;
  }

  return axios.create({
    ...DEFAULT_CONFIG,
    headers: {
      ...DEFAULT_CONFIG.headers,
      Authorization: `token ${token}`,
    },
  });
}
