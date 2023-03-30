import { useEffect } from "react";
import { useState } from "react";
import KakaoMap from "components/KakaoMap";
import { locationState, storeState } from "Atom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import PriceNav from "components/PriceNav";
import Loader from "components/Loader";

const Container = styled.div`
  max-width: 480px;
  min-height: calc(100vh - 110px);
  margin: 0 auto;
  padding: 20px 10px 10px 10px;
  background-color: #ffffff;
`;

const RangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 5px 15px 7px 20px;
  background-color: #246653;
  border-radius: 10px 10px 0px 0px;
`;

const Column = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
`;

const Distance = styled.span<{ size: string }>`
  font-size: ${(props) => props.size};
  color: #ffffff;
`;

const Range = styled.input`
  -webkit-appearance: none;
  background: transparent;
  &::-webkit-slider-runnable-track {
    height: 15px;
    background: #ffffff;
    border-radius: 10px;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #e9c46a;
  }
`;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(750);
  const [range, setRange] = useState(50);
  const store = useRecoilValue(storeState);
  const location = useRecoilValue(locationState);

  useEffect(() => {
    if (location.lat) setLoading(false);
  }, [location]);

  useEffect(() => {
    if (location.lat) setLoading(false);
  }, [distance]);

  const onRangeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setRange(Number(value));
  };

  const onMouseUp = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setDistance(Number(value) * 15);
  };

  return (
    <Container>
      <PriceNav />
      <RangeContainer>
        <Column>
          <Distance size={"14px"}>{distance}m 반경</Distance>
        </Column>
        <Column>
          <Distance size={"12px"}>0km</Distance>
          <Range
            type="range"
            onInput={onRangeChange}
            onMouseUp={onMouseUp}
            value={range}
          />
          <Distance size={"12px"}>1.5km</Distance>
        </Column>
      </RangeContainer>
      {!loading && !store.loading ? (
        <KakaoMap arr={store.arr} location={location} distance={distance} />
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default Home;
