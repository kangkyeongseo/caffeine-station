import React from "react";
import Map from "components/Map";
import { useEffect } from "react";
import { useState } from "react";
import searchPlaces from "components/searchPlaces";

interface location {
  lat: null | number;
  lon: null | number;
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<location>({
    lat: null,
    lon: null,
  });
  const getlocation = () => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
        searchPlaces(location);
      });
  };
  useEffect(() => {
    getlocation();
  }, []);
  return <div>{loading ? null : <Map location={location} />}</div>;
};

export default Home;
