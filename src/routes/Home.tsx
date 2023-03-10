import { useEffect } from "react";
import { useState } from "react";
import KakaoMap from "components/KakaoMap";
import { locationState } from "Atom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

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

const Lists = styled.ul`
  display: flex;
  gap: 20px;
  font-weight: lighter;
  margin-left: 20px;
`;

const List = styled.li<{ clicked: number }>`
  color: rgba(0, 0, 0, 0.9);
  font-weight: ${(props) => props.clicked};
  cursor: pointer;
`;

const Loading = styled.div`
  text-align: center;
  margin-top: 200px;
`;

const Home = () => {
  const location = useRecoilValue(locationState);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState("low");
  const [arr, setArr] = useState(coffeePrice.low);

  useEffect(() => {
    if (location.lat) setLoading(false);
  }, [location]);

  useEffect(() => {
    if (location.lat) {
      setLoading(false);
    }
  }, [arr]);

  const onPriceClick = (price: string) => {
    setLoading(true);
    if (price === "low") {
      setArr(coffeePrice.low);
      setPrice("low");
    } else if (price === "middle") {
      setArr(coffeePrice.middle);
      setPrice("middle");
    } else {
      setArr(coffeePrice.high);
      setPrice("high");
    }
  };
  return (
    <Container>
      <Lists>
        <List
          onClick={() => onPriceClick("low")}
          clicked={price === "low" ? 500 : 300}
        >
          가성비
        </List>
        <List
          onClick={() => onPriceClick("middle")}
          clicked={price === "middle" ? 500 : 300}
        >
          브랜드
        </List>
        <List
          onClick={() => onPriceClick("high")}
          clicked={price === "high" ? 500 : 300}
        >
          프리미언
        </List>
      </Lists>
      {!loading ? <KakaoMap arr={arr} /> : <Loading>Loading</Loading>}
    </Container>
  );
};

export default Home;
