import { locationState, storeState } from "Atom";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

export const coffeePrice = {
  low: ["메가커피", "컴포즈커피", "메머드커피", "빽다방", "더벤티"],
  middle: ["이디야", "커피베이", "요거프레소"],
  high: ["스타벅스", "투썸플레이스", "폴바셋", "드롭탑", "파스쿠찌"],
};

const PriceLists = styled.ul`
  display: flex;
  gap: 20px;
  font-weight: lighter;
  margin-left: 20px;
`;

const PriceList = styled.li<{ clicked: number }>`
  color: rgba(0, 0, 0, 0.9);
  font-weight: ${(props) => props.clicked};
  cursor: pointer;
`;

const PriceNav = () => {
  const location = useRecoilValue(locationState);
  const [store, setStore] = useRecoilState(storeState);
  const [price, setPrice] = useState("low");

  const onPriceClick = (price: string) => {
    if (price === "low") {
      setStore({ arr: coffeePrice.low, loading: true });
      setPrice("low");
    } else if (price === "middle") {
      setStore({ arr: coffeePrice.middle, loading: true });
      setPrice("middle");
    } else {
      setStore({ arr: coffeePrice.high, loading: true });
      setPrice("high");
    }
  };

  useEffect(() => {
    if (location.lat && store.loading) {
      setStore({ ...store, loading: false });
    }
  }, [store.arr]);

  return (
    <PriceLists>
      <PriceList
        onClick={() => onPriceClick("low")}
        clicked={price === "low" ? 500 : 300}
      >
        가성비
      </PriceList>
      <PriceList
        onClick={() => onPriceClick("middle")}
        clicked={price === "middle" ? 500 : 300}
      >
        브랜드
      </PriceList>
      <PriceList
        onClick={() => onPriceClick("high")}
        clicked={price === "high" ? 500 : 300}
      >
        프리미언
      </PriceList>
    </PriceLists>
  );
};

export default PriceNav;
