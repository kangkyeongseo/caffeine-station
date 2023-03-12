import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { locationState, searchLocationState, storeState } from "Atom";
import KakaoMap from "components/KakaoMap";
import Loader from "components/Loader";
import PriceNav from "components/PriceNav";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { coffeePrice } from "./Home";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 20px 0px;
  margin-bottom: 30px;
  background-color: #ffffff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 10px;
  margin-bottom: 10px;
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

const PlaceBtn = styled.button`
  margin-left: 380px;
  font-size: 12px;
  border: none;
  background-color: #246653;
  border-radius: 20px;
  color: #ffffff;
  padding: 5px 10px;
  &:hover {
    background-color: #144235;
  }
`;

const Search = () => {
  const store = useRecoilValue(storeState);
  const location = useRecoilValue(searchLocationState);
  const [loading, setLoading] = useState(true);
  const [searchingPlace, setSearchingPlace] = useState("");
  const [newPlace, setNewPlace] = useState("");
  const [getCenter, setGetCenter] = useState(false);
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
      setLoading(true);
      setGetCenter(false);
      setLoading(false);
    }
  }, [getCenter]);

  const onClick = () => {
    setGetCenter(true);
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <TextInput type="text" placeholder="주소" onChange={onChange} />
        <Button onClick={onBtnClick}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Form>
      <PlaceBtn onClick={onClick}>이 지역 재검색</PlaceBtn>
      <PriceNav />
      {!loading && !store.loading ? (
        <KakaoMap
          arr={store.arr}
          location={location}
          newPlace={newPlace}
          getCenter={getCenter}
        />
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default Search;
