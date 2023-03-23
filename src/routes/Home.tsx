import { useEffect } from "react";
import { useState } from "react";
import KakaoMap from "components/KakaoMap";
import { locationState, storeState } from "Atom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import PriceNav from "components/PriceNav";
import Loader from "components/Loader";

export const coffeePrice = {
  low: ["메가커피", "컴포즈커피", "메머드커피", "빽다방", "더벤티"],
  middle: ["이디야", "커피베이", "요거프레소"],
  high: ["스타벅스", "투썸플레이스", "폴바셋", "드롭탑", "파스쿠찌"],
};

const Container = styled.div`
  max-width: 480px;
  min-height: calc(100vh - 110px);
  margin: 0 auto;
  padding: 20px 10px;
  background-color: #ffffff;
`;

const Range = styled.input`
  -webkit-appearance: none;
  border: 1px;
  &::-webkit-slider-runnable-track {
    border: 1px solid #246653;
    border-radius: 10px;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #246653;
  }
`;

const Home = () => {
  const store = useRecoilValue(storeState);
  const location = useRecoilValue(locationState);
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(750);

  useEffect(() => {
    if (location.lat) setLoading(false);
  }, [location]);

  const onRangeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setDistance(Number(value) * 15);
  };

  return (
    <Container>
      <PriceNav />
      <Range type="range" onInput={onRangeChange} value={distance / 15} />
      {!loading && !store.loading ? (
        <KakaoMap arr={store.arr} location={location} distance={distance} />
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default Home;
