import {
  locationState,
  mapLocationState,
  searchLocationState,
  sessionState,
} from "Atom";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import AppRouter from "./components/Router";
import useCurrentLocation from "libs/useCurrentLocation";

export const { kakao } = window;

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const setLocation = useSetRecoilState(locationState);
  const setSearchLocation = useSetRecoilState(searchLocationState);
  const setMapLocation = useSetRecoilState(mapLocationState);
  const setSession = useSetRecoilState(sessionState);
  const { loading, location: currentLocation } = useCurrentLocation();
  const getSession = async () => {
    const response = await fetch("http://localhost:8000/api/session", {
      credentials: "include",
    }).then((response) => response.json());
    if (response.session.loggedIn) {
      setSession({
        loggedIn: response.session.loggedIn,
        user: response.session.user,
      });
    }
  };
  useEffect(() => {
    getSession();
  }, []);

  useEffect(() => {
    if (!loading)
      setLocation({ lat: currentLocation.lat, lon: currentLocation.lon });
    setSearchLocation({ lat: currentLocation.lat, lon: currentLocation.lon });
    setMapLocation({ lat: currentLocation.lat, lon: currentLocation.lon });
  }, [loading]);

  return <AppRouter />;
}

export default App;
