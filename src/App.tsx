import { Location, locationState, sessionState } from "Atom";
import { response } from "express";
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
  const [session, setSession] = useRecoilState(sessionState);
  const getLocation = () => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
  };
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
    getLocation();
    getSession();
  }, []);

  return <AppRouter />;
}

export default App;
