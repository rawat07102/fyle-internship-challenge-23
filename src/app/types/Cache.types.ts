import { GithubRepo } from "./GithubRepo.types";

export interface Cache {
  [key: string]: GithubRepo[];
}
