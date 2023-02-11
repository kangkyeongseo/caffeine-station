import React, { useEffect, useState } from "react";
import AppRouter from "./Router";

export const { kakao } = window;

declare global {
  interface Window {
    kakao: any;
  }
}

export interface Location {
  lat: number | null;
  lon: number | null;
}

function App() {
  const [location, setLocation] = useState<Location>({ lat: null, lon: null });
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
  return <AppRouter location={location} />;
}

export default App;
