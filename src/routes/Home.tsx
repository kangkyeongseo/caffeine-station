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

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<Location | null>(null);
  const [caffeinePrice, setCaffeinePrice] = useState("low");
  const { newData: data, reset } = useSearchPlaces(
    location ? location : null,
    caffeinePrice
  );
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
  const onPriceClick = (price: string) => {
    setCaffeinePrice(price);
    reset(price);
  };
  return (
    <div>
      <ul>
        <li onClick={() => onPriceClick("low")}>저가</li>
        <li onClick={() => onPriceClick("middle")}>중가</li>
        <li onClick={() => onPriceClick("high")}>고가</li>
      </ul>
      {location ? <Map location={location} /> : null}
      <div>
        {data?.map((place) => (
          <Cafe key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
};

export default Home;
