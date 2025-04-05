import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { AuthUser } from '@/types/authTypes';

const { persistAtom } = recoilPersist();

export type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string;
};

// ✅ Type guard to validate parsed object
const isValidAuthState = (data: any): data is AuthState => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'isAuthenticated' in data &&
    'user' in data &&
    'token' in data
  );
};

let storedAuth: AuthState | null = null;

try {
  const raw = localStorage.getItem('auth');
  const parsed = JSON.parse(raw || 'null');
  if (isValidAuthState(parsed)) {
    storedAuth = parsed;
  }
} catch {
  storedAuth = null;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: storedAuth || {
    isAuthenticated: false,
    user: null,
    token: '',
  },
  effects_UNSTABLE: [persistAtom],
});
