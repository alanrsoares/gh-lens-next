import {
  useGithubAccessToken,
  useGithubQuery,
  useUserRepositories,
} from "lib/github-client/hooks";
import type { Repository, Viewer } from "lib/github-client/types";

import Layout from "components/Layout";
import Loading from "components/Loading";

const Repos: React.FC<{ githubLogin: string }> = ({ githubLogin }) => {
  const { data: repos, isLoading } = useUserRepositories(githubLogin);

  if (isLoading) {
    return <Loading>Loading repos...</Loading>;
  }

  return (
    <div>
      <ul className="max-h-96 overflow-y-scroll">
        {repos?.map((x) => (
          <li key={x.id}>
            <article className="bg-gray-100 my-4 p-4 rounded-md">
              <header>
                {x.name}
                <div>{x.description}</div>
              </header>
              <div></div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Repositories() {
  useGithubAccessToken({
    redirectTo: "/login",
  });

  const { data: viewer } = useGithubQuery<Viewer>("/user");

  return (
    <Layout pageTitle="Github Lens - Repositories">
      <div className="mx-4">
        {viewer && <Repos githubLogin={viewer?.login} />}
      </div>
    </Layout>
  );
}
