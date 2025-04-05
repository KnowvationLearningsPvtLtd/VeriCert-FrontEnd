import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { AuthUser } from '@/types/authTypes';

const { persistAtom } = recoilPersist();

export type AuthState = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string;
};

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isAuthenticated: false,
    user: null,
    token: '',
  },
  effects_UNSTABLE: [persistAtom],
});
