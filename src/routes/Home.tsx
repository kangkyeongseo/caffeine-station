import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useSearchPlaces from "components/useSearchPlaces";
import Map from "components/Map";
import Cafe from "components/Cafe";

export interface Location {
  lat: number;
  lon: number;
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
      {location ? <Map location={location} /> : null}
      <div>
        {data?.map((place) => (
          <Cafe
            key={place.id}
            place_name={place.place_name}
            road_address_name={place.road_address_name}
            phone={place.phone}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
