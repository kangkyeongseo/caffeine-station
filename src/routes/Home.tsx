import { useEffect } from "react";
import { useState } from "react";
import KakaoMap from "components/KakaoMap";
import { locationState, storeState } from "Atom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import PriceNav from "components/PriceNav";

export const coffeePrice = {
  low: ["메가커피", "컴포즈커피", "메머드커피", "빽다방", "더벤티"],
  middle: ["이디야", "커피베이", "요거프레소"],
  high: ["스타벅스", "투썸플레이스", "폴바셋", "드롭탑", "파스쿠찌"],
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 20px 0px;
  margin-bottom: 30px;
  background-color: #ffffff;
`;

const Loading = styled.div`
  text-align: center;
  margin-top: 200px;
`;

const Home = () => {
  const store = useRecoilValue(storeState);
  const location = useRecoilValue(locationState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.lat) setLoading(false);
  }, [location]);

  return (
    <Container>
      <PriceNav />
      {!loading && !store.loading ? (
        <KakaoMap arr={store.arr} location={location} />
      ) : (
        <Loading>Loading</Loading>
      )}
    </Container>
  );
};

export default Home;
