import { GithubUser } from "./GithubUser.types";

export interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  updated_at: string;
  owner: GithubUser
}
