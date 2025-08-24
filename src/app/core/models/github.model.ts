export interface GithubUserSearch {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}

export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  score: number;
  node_id: string;
  url: string;
  type: string;
  site_admin: boolean;
}

export interface GithubUserDetail extends GithubUser {
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  bio?: string;
  twitter_username?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  user_view_type: string;
}

export interface GithubUserWithFollowers extends GithubUser {
  followers: number;
}
