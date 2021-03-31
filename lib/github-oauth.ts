import qs from "query-string";
import axios from "axios";

const GH_CLIENT_ID = process.env.NEXT_PUBLIC_GH_CLIENT_ID;

const GH_REDIRECT_URL = process.env.NEXT_PUBLIC_GH_REDIRECT_URL;

const GH_OAUTH_URL = "https://github.com/login/oauth";

const GH_SCOPES = ["user", "public_repo", "repo"];

const params = qs.stringify({
  scope: GH_SCOPES.join(" "),
  client_id: GH_CLIENT_ID,
  redirect_uri: GH_REDIRECT_URL,
});

export const GH_AUTHORIZE_URL = `${GH_OAUTH_URL}/authorize?${params}`;

// api client

export const GH_ACCESS_TOKEN_ENDPOINT = `${GH_OAUTH_URL}/access_token`;

const client = axios.create({
  headers: {
    accept: "application/json",
  },
});

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export async function exchangeCodeForAccessToken(code: string, secret: string) {
  return await client.post<AccessTokenResponse>(GH_ACCESS_TOKEN_ENDPOINT, {
    code,
    client_secret: secret,
    client_id: GH_CLIENT_ID,
    redirect_uri: GH_REDIRECT_URL,
  });
}
