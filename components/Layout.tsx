import Head from "next/head";

import { useContainer } from "contexts/auth";
import { useGithubQuery } from "lib/hooks";
import { Viewer } from "model/types";

const Layout: React.FC<{ pageTitle?: string }> = ({ children, pageTitle }) => {
  const [state, actions] = useContainer();

  const { data: viewer } = useGithubQuery<Viewer>("/user");

  return (
    <>
      <Head>
        {pageTitle && <title>{pageTitle}</title>}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="sticky top-0 bg-gray-900 text-white w-full flex p-4 items-center justify-between">
        <div className="grid grid-flow-col gap-2">
          <a className="focus:opacity-50 hover:opacity-80" href="/">
            Github Lens
          </a>
          {state.isAuthenticated && (
            <nav>
              <ul className="inline-flex">
                <li>
                  <a
                    className="focus:opacity-50 hover:opacity-80"
                    href="/repositories"
                  >
                    Repos
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
        <div className="flex items-center">
          {state.isAuthenticated && (
            <>
              <div className="mr-2 sm:block hidden">Hello, {viewer?.name}</div>
              <button
                className="py-2 px-3 bg-gray-800 rounded-md"
                onClick={actions.signOut}
              >
                sign out
              </button>
            </>
          )}
        </div>
      </header>
      <main className="min-h-screen flex flex-col flex-1 h-full w-full bg-gray-600">
        {children}
      </main>
    </>
  );
};

export default Layout;
