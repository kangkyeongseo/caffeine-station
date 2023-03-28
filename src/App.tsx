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

// Kakao Maps API를 Typescript에서 사용하기 위해 선언합니다.
declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const setLocation = useSetRecoilState(locationState);
  const setSearchLocation = useSetRecoilState(searchLocationState);
  const setSession = useSetRecoilState(sessionState);
  const { loading, location: currentLocation } = useCurrentLocation();

  //Session을 불러와 로그인 유무를 판단 후 Recoil State에 저장합니다.
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

  //useCurrentLocation를 이용하여 위치 정보를 Recoil State에 저장합니다.
  useEffect(() => {
    if (!loading) {
      setLocation({ lat: currentLocation.lat, lon: currentLocation.lon });
      setSearchLocation({ lat: currentLocation.lat, lon: currentLocation.lon });
    }
  }, [loading]);

  return <AppRouter />;
}

export default App;
