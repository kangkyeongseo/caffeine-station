import { User } from "db/User";
import { atom } from "recoil";

export interface Location {
  lat: number | null;
  lon: number | null;
}

export interface Session {
  loggedIn: boolean;
  user: User | null;
}

export const locationState = atom<Location>({
  key: "locationState",
  default: { lat: null, lon: null },
});

export const sessionState = atom<Session>({
  key: "sessionState",
  default: { loggedIn: false, user: null },
});
