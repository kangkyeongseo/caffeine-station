import { useEffect } from "react";
import { useState } from "react";
import KakaoMap from "components/KakaoMap";

export interface Location {
  lat: number | null;
  lon: number | null;
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<Location>({ lat: null, lon: null });
  const [arr, setArr] = useState<string[]>([]);
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
    if (arr.length) setLoading(false);
  }, [arr]);
  const onPriceClick = (price: string) => {
    if (price === "low") {
      setArr(["메가커피", "컴포즈커피", "메머드커피", "빽다방"]);
      setLoading(true);
    } else if (price === "middle") {
      setArr(["이디야", "커피베이", "요거프레소"]);
      setLoading(true);
    } else {
      setArr(["스타벅스", "투썸플레이스", "폴바셋"]);
      setLoading(true);
    }
  };
  return (
    <div>
      <ul>
        <li onClick={() => onPriceClick("low")}>저가</li>
        <li onClick={() => onPriceClick("middle")}>중가</li>
        <li onClick={() => onPriceClick("high")}>고가</li>
      </ul>
      {!loading ? <KakaoMap location={location} arr={arr} /> : null}
    </div>
  );
};

export default Home;
