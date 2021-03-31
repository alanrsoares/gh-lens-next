import { useGithubAccessToken, useGithubQuery } from "lib/hooks";
import type { Viewer } from "model/types";

import Layout from "components/Layout";
import GithubCard from "components/GithubCard";
import Loading from "components/Loading";

export default function Home() {
  useGithubAccessToken({
    redirectTo: "/login",
  });

  const { data: viewer, isLoading: isLoadingViewer } = useGithubQuery<Viewer>(
    "/user"
  );

  if (isLoadingViewer) {
    return (
      <Layout pageTitle="Github Lens">
        <Loading>Loading...</Loading>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Github Lens - profile">
      <div className="flex-1 block md:pt-24 sm:pt-18 pt-0 items-center justify-center">
        {viewer && <GithubCard viewer={viewer} />}
      </div>
    </Layout>
  );
}
