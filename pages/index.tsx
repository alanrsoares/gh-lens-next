import Link from "next/link";

import { useGithubAccessToken, useGithubQuery } from "lib/hooks";
import type { Viewer } from "model/types";

import Layout from "components/Layout";

const useViewer = (token: string) => useGithubQuery<Viewer>("/user", token);

const Authenticated: React.FC<{ token: string }> = ({ token }) => {
  const { data: user, isLoading: isLoadingUser } = useViewer(token);

  if (isLoadingUser) {
    return <Layout pageTitle="Github Lens">Loading...</Layout>;
  }

  return (
    <Layout pageTitle="Github Lens">
      <div>Hello, {user?.name}</div>
      <div>
        <Link href="/repositories">View Repos</Link>
      </div>
    </Layout>
  );
};

export default function Home() {
  const { token } = useGithubAccessToken({
    redirectTo: "/login",
  });

  return <Authenticated token={token} />;
}
