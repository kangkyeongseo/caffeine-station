import { Location, locationState } from "Atom";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import AppRouter from "./components/Router";

export const { kakao } = window;

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const [location, setLocation] = useRecoilState(locationState);
  const getlocation = () => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
  };

  useEffect(() => {
    getlocation();
  }, []);

  return <AppRouter />;
}

export default App;
