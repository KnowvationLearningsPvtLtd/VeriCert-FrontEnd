export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  contact?: string;
  designation?: string;
  ["company/college"]?: string;
  title?: string;
  role?: string;
  profilePic?: string;
}

export type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string;
};
