import React from "react";
import Map from "components/Map";
import { useEffect } from "react";
import { useState } from "react";
import useSearchPlaces from "components/useSearchPlaces";

interface Location {
  lat: null | number;
  lon: null | number;
}

export interface Place {
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

export interface Places {
  place: Place[];
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<Location | null>(null);
  const data = useSearchPlaces(location ? location : null);
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
  return (
    <div>
      {loading ? null : <Map location={location} />}
      <div>
        {data?.map((place) => (
          <span key={place.id}>{place.place_name}</span>
        ))}
      </div>
    </div>
  );
};

export default Home;
