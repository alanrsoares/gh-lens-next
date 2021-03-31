import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { GH_AUTHORIZE_URL } from "lib/github-oauth";
import { useContainer } from "contexts/auth";

import Layout from "components/Layout";
import SignInWithGithubLink from "components/SignInWithGithubLink";

const Login: React.FC = () => {
  const [state, actions] = useContainer();
  const router = useRouter();

  useEffect(() => {
    if (state.isAuthenticated) {
      router.push("/");
      return;
    }

    async function task() {
      const { code } = router.query;

      if (code) {
        // captured github oauth code

        const { data } = await axios.post("/api/login", { code });

        if (data.token) {
          // persist to localStorage
          actions.signIn(data.token);

          router.push("/");
        }
      }
    }

    task();
  }, [router, state.isAuthenticated]);

  return (
    <Layout>
      <SignInWithGithubLink href={GH_AUTHORIZE_URL} />
    </Layout>
  );
};

export default Login;
