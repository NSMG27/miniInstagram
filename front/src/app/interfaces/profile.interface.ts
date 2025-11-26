export interface ProfileData {
  status: number;
  message: string;
  user: {
    userId: string;
    name: string;
    username: string;
    followers: number;
    following: number;
    publications: number;
    webSite: string;
    presentation: string;
    genero: string;
    suggestAccounts: boolean;
  }
}