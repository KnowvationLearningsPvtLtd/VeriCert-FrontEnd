export type AuthUser = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string;
};
