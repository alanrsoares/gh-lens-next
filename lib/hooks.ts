import { useEffect } from "react";
import Router from "next/router";
import { useQuery } from "react-query";

import githubClient from "lib/github-client";
import { useContainer } from "contexts/auth";

export function useGithubAccessToken(ctx?: { redirectTo?: string }) {
  const [{ token }, actions] = useContainer();

  useEffect(() => {
    const currentToken = localStorage.getItem("gh-token");

    if (currentToken) {
      actions.signIn(currentToken);
      return;
    }

    if (ctx?.redirectTo) {
      Router.push(ctx.redirectTo);
    }
  }, [ctx]);

  return { token };
}

async function getGithubResource<T>(path: string, token: string) {
  const result = await githubClient.get<T>(path, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  return result.data;
}

export function useGithubQuery<T, E = Error>(path: string, token: string) {
  const fetcher = () => getGithubResource<T>(path, token);

  return useQuery<T, E>(path, fetcher, {
    enabled: Boolean(token),
  });
}
