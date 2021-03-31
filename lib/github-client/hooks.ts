import { useEffect } from "react";
import Router from "next/router";
import { useQuery } from "react-query";

import { getGithubResource } from "lib/github-client";
import { useContainer } from "contexts/auth";
import { Repository, Viewer } from "./types";

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

export function useGithubQuery<T, E = Error>(path: string) {
  const [state] = useContainer();
  const fetcher = () => getGithubResource<T>(path, state.token);

  return useQuery<T, E>(path, fetcher, {
    enabled: state.isAuthenticated,
  });
}

export const useViewer = () => useGithubQuery<Viewer>("/user");

export const useUserRepositories = (githubLogin: string) =>
  useGithubQuery<Repository[]>(`/users/${githubLogin}/repos`);
