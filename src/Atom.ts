import { atom } from "recoil";

export interface Location {
  lat: number | null;
  lon: number | null;
}

export const locationState = atom<Location>({
  key: "locationState",
  default: { lat: null, lon: null },
});
