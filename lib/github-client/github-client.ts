import axios from "axios";

const client = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

export default client;

export async function getGithubResource<T>(path: string, token: string) {
  const result = await client.get<T>(path, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  return result.data;
}
