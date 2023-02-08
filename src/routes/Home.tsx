import { useEffect } from "react";
import { useState } from "react";
import KakaoMap from "components/KakaoMap";

export interface Location {
  lat: number | null;
  lon: number | null;
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
  const [location, setLocation] = useState<Location>({ lat: null, lon: null });
  const [caffeinePrice, setCaffeinePrice] = useState("low");
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
  useEffect(() => {
    if (location.lat) setLoading(false);
  }, [location]);
  const onPriceClick = (price: string) => {
    setCaffeinePrice(price);
  };
  return (
    <div>
      <ul>
        <li onClick={() => onPriceClick("low")}>저가</li>
        <li onClick={() => onPriceClick("middle")}>중가</li>
        <li onClick={() => onPriceClick("high")}>고가</li>
      </ul>
      {!loading ? <KakaoMap location={location} /> : null}
    </div>
  );
};

export default Home;
