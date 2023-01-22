import React from "react";
import Map from "components/Map";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
      });
  }, []);
  return <div>{loading ? null : <Map location={location} />}</div>;
};

export default Home;
