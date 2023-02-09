import { useEffect } from "react";
import { useState } from "react";
import KakaoMap from "components/KakaoMap";

export interface Location {
  lat: number | null;
  lon: number | null;
}

const coffeePrice = {
  low: ["메가커피", "컴포즈커피", "메머드커피", "빽다방", "더벤티"],
  middle: ["이디야", "커피베이", "요거프레소"],
  high: ["스타벅스", "투썸플레이스", "폴바셋", "드롭탑", "파스쿠찌"],
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<Location>({ lat: null, lon: null });
  const [arr, setArr] = useState(coffeePrice.low);
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
  useEffect(() => {
    if (location.lat && arr.length) {
      setLoading(false);
    }
  }, [arr]);
  const onPriceClick = (price: string) => {
    setLoading(true);
    if (price === "low") {
      setArr(coffeePrice.low);
    } else if (price === "middle") {
      setArr(coffeePrice.middle);
    } else {
      setArr(coffeePrice.high);
    }
  };
  return (
    <div>
      <ul>
        <li onClick={() => onPriceClick("low")}>저가</li>
        <li onClick={() => onPriceClick("middle")}>중가</li>
        <li onClick={() => onPriceClick("high")}>고가</li>
      </ul>
      {!loading ? (
        <KakaoMap location={location} arr={arr} />
      ) : (
        <span>Loading</span>
      )}
    </div>
  );
};

export default Home;
