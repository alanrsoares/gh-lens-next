export interface Viewer {
  avatar_url: string;
  bio: string;
  blog: string;
  company: string;
  email: string;
  followers: number;
  following: number;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  owned_private_repos: number;
  private_gists: number;
  public_gists: number;
  public_repos: number;
  repos_url: string;
  site_admin: boolean;
  subscriptions_url: string;
  total_private_repos: number;
  twitter_username: null | string;
  two_factor_authentication: boolean;
  type: string;
  updated_at: string;
  url: string;
}

export interface Repository {
  id: string;
  name: string;
  description: string;
}
