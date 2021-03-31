import Head from "next/head";
import Link from "next/link";
import { useContainer } from "contexts/auth";

const Layout: React.FC<{ pageTitle?: string }> = ({ children, pageTitle }) => {
  const [state, actions] = useContainer();

  return (
    <>
      {pageTitle && (
        <Head>
          <title>{pageTitle}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}
      <div className="sticky top-0 bg-gray-900 text-white w-full flex p-4 items-center justify-between">
        <div>
          <Link href="/">Github Lens</Link>
        </div>
        <div>
          {state.isAuthenticated && (
            <button
              className="py-2 px-3 bg-gray-800 rounded-md"
              onClick={actions.signOut}
            >
              sign out
            </button>
          )}
        </div>
      </div>
      <div className="min-h-screen h-full w-full bg-gray-600 grid place-items-center">
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
