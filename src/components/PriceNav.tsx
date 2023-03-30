import { locationState, storeState } from "Atom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

export const coffeePrice = {
  low: ["메가커피", "컴포즈커피", "메머드커피", "빽다방", "더벤티"],
  middle: ["이디야", "커피베이", "요거프레소"],
  high: ["스타벅스", "투썸플레이스", "폴바셋", "드롭탑", "파스쿠찌"],
};

const PriceLists = styled.ul`
  position: relative;
  max-width: 330px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-weight: lighter;
  margin: 0 auto;
  padding: 10px 0px;
  background-color: #e9c46a;
  border-radius: 20px;
`;

const PriceSelected = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #246653;
  width: 110px;
  height: 36px;
  border-radius: 20px;
`;

const PriceList = styled.li<{ clicked: boolean }>`
  z-index: 2;
  text-align: center;
  color: ${(props) => (props.clicked ? "#ffffff" : "#000000")};
  font-weight: ${(props) => (props.clicked ? 500 : 300)};
  cursor: pointer;
  transition: all 0.5s;
`;

const PriceNav = () => {
  const [price, setPrice] = useState("low");
  const location = useRecoilValue(locationState);
  const [store, setStore] = useRecoilState(storeState);

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
  }, [store]);

  const selectedVars = {
    start: {},
    end: {
      translateX: price === "middle" ? 110 : price === "high" ? 220 : 0,
      transition: { type: "spring", duration: 0.5 },
    },
  };

  return (
    <PriceLists>
      <PriceSelected variants={selectedVars} initial="start" animate="end" />
      <PriceList
        onClick={() => onPriceClick("low")}
        clicked={price === "low" ? true : false}
      >
        가성비
      </PriceList>
      <PriceList
        onClick={() => onPriceClick("middle")}
        clicked={price === "middle" ? true : false}
      >
        브랜드
      </PriceList>
      <PriceList
        onClick={() => onPriceClick("high")}
        clicked={price === "high" ? true : false}
      >
        프리미엄
      </PriceList>
    </PriceLists>
  );
};

export default PriceNav;
