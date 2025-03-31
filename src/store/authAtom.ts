import { AuthUser } from '@/types/authTypes'
import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

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