import { useContainer } from "contexts/auth";
import { useViewer } from "lib/github-client";

const AppBar: React.FC = () => {
  const [state, actions] = useContainer();
  const { data: viewer } = useViewer();

  return (
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
  );
};

export default AppBar;
