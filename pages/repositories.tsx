import { useQuery } from "react-query";

import { useGithubAccessToken } from "lib/hooks";
import githubClient from "lib/github-client";

import Layout from "components/Layout";
import { useContainer } from "contexts/auth";
import { Repository } from "model/types";

interface Viewer {
  name: string;
  login: string;
}

async function getGithubResource<T>(path: string, token: string) {
  const result = await githubClient.get<T>(path, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  return result.data;
}

function useGithubQuery<T, E = Error>(path: string) {
  const { token } = useGithubAccessToken({ redirectTo: "/login" });
  const fetcher = () => getGithubResource<T>(path, token);

  return useQuery<T, E>(path, fetcher, {
    enabled: Boolean(token),
  });
}

const useViewer = () => useGithubQuery<Viewer>("/user");

const Repos = ({ login }: { login: string }) => {
  const { data: repos, isLoading: isLoadingRepos } = useGithubQuery<
    Repository[]
  >(`/users/${login}/repos`);

  if (isLoadingRepos) {
    return <div>Loading repos...</div>;
  }

  return (
    <div>
      <ul className="max-h-96 overflow-y-scroll">
        {repos?.map((x) => (
          <li key={x.id}>{x.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default function Repositories() {
  useGithubAccessToken({
    redirectTo: "/login",
  });

  const { data: viewer } = useViewer();

  return (
    <Layout pageTitle="Github Lens - Repositories">
      Hello, {viewer?.name}
      <div>{viewer && <Repos login={viewer?.login} />}</div>
    </Layout>
  );
}
