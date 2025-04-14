import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// Initialize recoil-persist
const { persistAtom } = recoilPersist({
  key: "userProfile", // Key for localStorage
  storage: localStorage, // You can also use sessionStorage if needed
});

export interface Preferences {
  darkMode: boolean;
  language: string;
}

export interface Notifications {
  email: boolean;
  app: boolean;
}

export interface UserProfile {
  title: string;
  name: string;
  email: string;
  role: string;
  dob: string;
  gender: string;
  preferences: Preferences;
  notifications: Notifications;
  profilePic: string;
  contact: string;
  userId: string;
  companyOrCollege: string; // ✅ Updated property
  designation: string;
}

export const userProfileAtom = atom<UserProfile>({
  key: "userProfileAtom", // Unique key for the atom
  default: {
    title: "Mr.",
    name: "",
    email: "",
    role: "",
    dob: "",
    gender: "",
    preferences: {
      darkMode: false,
      language: "en",
    },
    notifications: {
      email: true,
      app: false,
    },
    profilePic: "",
    contact: "",
    userId: "",
    companyOrCollege: "", // ✅ Updated key
    designation: "",
  },
  effects_UNSTABLE: [persistAtom], // Persist to localStorage
});
