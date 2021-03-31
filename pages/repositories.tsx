import { useGithubAccessToken, useGithubQuery } from "lib/hooks";
import { Repository, Viewer } from "model/types";

import Layout from "components/Layout";
import Loading from "components/Loading";

const Repos = ({ login }: { login: string }) => {
  const { data: repos, isLoading: isLoadingRepos } = useGithubQuery<
    Repository[]
  >(`/users/${login}/repos`);

  if (isLoadingRepos) {
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
      <div className="mx-4">{viewer && <Repos login={viewer?.login} />}</div>
    </Layout>
  );
}
