import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { searchLocationState, storeState } from "Atom";
import KakaoMap from "components/KakaoMap";
import Loader from "components/Loader";
import PriceNav from "components/PriceNav";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Container = styled.div`
  max-width: 480px;
  min-height: calc(100vh - 110px);
  margin: 0 auto;
  padding: 20px 10px;
  background-color: #ffffff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 10px;
  margin-bottom: 15px;
`;

const TextInput = styled.input`
  padding: 10px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 7px;
  right: 10px;
  color: #246653;
  font-size: 20px;
  background-color: inherit;
  border: none;
`;

const PlaceBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlaceBtn = styled.button`
  font-size: 12px;
  border: none;
  background-color: #246653;
  border-radius: 20px;
  color: #ffffff;
  padding: 5px 10px;
  margin-right: 10px;
  &:hover {
    background-color: #144235;
  }
`;

const RangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 5px 15px 7px 25px;
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

const Search = () => {
  const store = useRecoilValue(storeState);
  const location = useRecoilValue(searchLocationState);
  const [loading, setLoading] = useState(true);
  const [searchingPlace, setSearchingPlace] = useState("");
  const [newPlace, setNewPlace] = useState("");
  const [getCenter, setGetCenter] = useState(false);
  const [distance, setDistance] = useState(750);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setSearchingPlace(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewPlace(searchingPlace);
  };
  const onBtnClick = () => {
    setNewPlace(searchingPlace);
  };
  useEffect(() => {
    if (location.lat) setLoading(false);
  }, [location]);

  useEffect(() => {
    if (getCenter) {
      setGetCenter(false);
    }
  }, [getCenter]);

  const onClick = () => {
    setGetCenter(true);
  };

  useEffect(() => {
    setLoading(false);
  }, [distance]);

  const onRangeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setLoading(true);
    setDistance(Number(value) * 15);
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <TextInput type="text" placeholder="주소" onChange={onChange} />
        <Button onClick={onBtnClick}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Form>
      <PlaceBtnContainer>
        <PriceNav />
        <PlaceBtn onClick={onClick}>이 지역 재검색</PlaceBtn>
      </PlaceBtnContainer>
      <RangeContainer>
        <Column>
          <Distance size={"14px"}>{distance}m 반경</Distance>
        </Column>
        <Column>
          <Distance size={"12px"}>0km</Distance>
          <Range type="range" onInput={onRangeChange} value={distance / 15} />
          <Distance size={"12px"}>1.5km</Distance>
        </Column>
      </RangeContainer>
      {!loading && !store.loading ? (
        <KakaoMap
          arr={store.arr}
          location={location}
          newPlace={newPlace}
          getCenter={getCenter}
          distance={distance}
        />
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default Search;
