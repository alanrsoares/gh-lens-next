import Head from "next/head";

import { useContainer } from "contexts/auth";
import { useGithubQuery } from "lib/github-client/hooks";
import { Viewer } from "lib/github-client/types";
import AppBar from "./AppBar";

const Layout: React.FC<{ pageTitle?: string }> = ({ children, pageTitle }) => {
  const [state, actions] = useContainer();

  const { data: viewer } = useGithubQuery<Viewer>("/user");

  return (
    <>
      <Head>
        {pageTitle && <title>{pageTitle}</title>}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <section className="min-h-screen h-full w-full bg-gray-600 grid place-items-center">
        <main>{children}</main>
      </section>
    </>
  );
};

export default Layout;
