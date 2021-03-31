import { useCallback, useEffect, useState } from "react";
import { createContainer } from "unstated-next";

export const GH_TOKEN_STORAGE_KEY = "gh-token";

function useAppContainer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string>();

  const handleSignIn = useCallback((token: string) => {
    localStorage.setItem(GH_TOKEN_STORAGE_KEY, token);
    setToken(token);
    setIsAuthenticated(true);
  }, []);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem(GH_TOKEN_STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  // on init container
  useEffect(() => {
    const token = localStorage.getItem(GH_TOKEN_STORAGE_KEY);

    if (token) {
      handleSignIn(token);
    } else {
      handleSignOut();
    }
  }, [handleSignIn, handleSignOut]);

  const state = {
    isAuthenticated,
    token,
  };

  const actions = {
    signIn: handleSignIn,
    signOut: handleSignOut,
  };

  return [state, actions] as const;
}

export const { Provider, useContainer } = createContainer(useAppContainer);
