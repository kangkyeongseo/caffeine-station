import React from "react";
import Map from "components/Map";
import { useEffect } from "react";
import { useState } from "react";
import useSearchPlaces from "components/useSearchPlaces";

interface Location {
  lat: null | number;
  lon: null | number;
}

interface Place {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface Places {
  places: Place[];
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<Location | null>(null);
  const data = useSearchPlaces(location ? location : null);
  console.log(data);
  const getlocation = () => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
      });
  };
  useEffect(() => {
    getlocation();
  }, []);
  return <div>{loading ? null : <Map location={location} />}</div>;
};

export default Home;
