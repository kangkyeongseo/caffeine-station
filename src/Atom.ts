import { User } from "db/User";
import { atom } from "recoil";

export interface Location {
  lat: number | null;
  lon: number | null;
}

export interface Session {
  loggedIn: boolean;
  user: UserWithId | null;
}

interface UserWithId extends User {
  _id: string;
}

interface Store {
  arr: string[];
  loading: boolean;
}

export const locationState = atom<Location>({
  key: "locationState",
  default: { lat: null, lon: null },
});

export const searchLocationState = atom<Location>({
  key: "searchLocationState",
  default: { lat: null, lon: null },
});

export const sessionState = atom<Session>({
  key: "sessionState",
  default: { loggedIn: false, user: null },
});

export const storeState = atom<Store>({
  key: "storeState",
  default: {
    arr: ["메가커피", "컴포즈커피", "메머드커피", "빽다방", "더벤티"],
    loading: false,
  },
});
