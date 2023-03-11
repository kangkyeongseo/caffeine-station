import { locationState, searchLocationState, sessionState } from "Atom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import AppRouter from "./components/Router";
import useCurrentLocation from "libs/useCurrentLocation";

export const { kakao } = window;

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const [location, setLocation] = useRecoilState(locationState);
  const [searchlocation, setSearchLocation] =
    useRecoilState(searchLocationState);
  const [session, setSession] = useRecoilState(sessionState);
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
  }, [loading]);

  return <AppRouter />;
}

export default App;
