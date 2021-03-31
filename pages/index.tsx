import { useGithubAccessToken, useViewer } from "lib/github-client/hooks";
import type { Viewer } from "lib/github-client/types";

import Layout from "components/Layout";
import GithubCard from "components/GithubCard";
import Loading from "components/Loading";

export default function Home() {
  useGithubAccessToken({
    redirectTo: "/login",
  });

  const { data: viewer, isLoading: isLoadingViewer } = useViewer();

  if (isLoadingViewer) {
    return (
      <Layout pageTitle="Github Lens">
        <Loading>Loading...</Loading>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Github Lens - profile">
      <div className="md:-mt-16">
        {viewer && <GithubCard viewer={viewer} />}
      </div>
    </Layout>
  );
}
