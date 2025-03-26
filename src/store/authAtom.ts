import { AuthUser } from "@/types/authTypes";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";


const { persistAtom } = recoilPersist()





export const authState = atom<AuthUser | null> ({
    key: 'authState',
    default: null,
    effects_UNSTABLE: [persistAtom]
})